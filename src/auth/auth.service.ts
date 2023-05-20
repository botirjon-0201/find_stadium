import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signup(createUserDto: CreateUserDto, res: Response) {
    const { email, password, confirm_password } = createUserDto;

    const user = await this.userService.findByEmail(email);
    if (user)
      throw new BadRequestException('User with that email is already exist!');

    if (password !== confirm_password)
      throw new BadRequestException('Password & confirm password is not match');

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const uniqueKey: string = uuidv4();

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      activation_link: uniqueKey,
    });

    const response = {
      ...(await this.getResponse(newUser, res)),
      message: 'Check your email, a confirmation message has been sent',
    };

    const sendMailData = {
      activation_link: newUser.activation_link,
      email: newUser.email,
      first_name: newUser.first_name,
    };
    await this.mailService.sendUserConfirmation(sendMailData);

    return response;
  }

  async signin(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('Email is wrong or User not registered');

    const isMatchPass = await compare(password, user.password);
    if (!isMatchPass)
      throw new BadRequestException("Password isn't correct, please try again");

    const response = {
      ...(await this.getResponse(user, res)),
      message: 'User have signed in successfully!',
    };
    return response;
  }

  async signout(refresh_token: string, res: Response) {
    const userData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) throw new ForbiddenException('User not found');

    const updatedUser = await this.userModel.update(
      { refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');

    const response = {
      user: this.userService.getUserField(updatedUser[1][0]),
      message: 'User have signed out successfully!',
    };
    return response;
  }

  async refreshToken(user_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    if (user_id !== +decodedToken['id'])
      throw new BadGatewayException('User id wrong, please try again');

    const user = await this.userService.findById(user_id);
    if (!user || !user.refresh_token)
      throw new BadGatewayException('User not found');

    const tokenMatch = await compare(refresh_token, user.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Cannot be access');

    const response = {
      ...(await this.getResponse(user, res)),
      message: 'User token refreshed',
    };
    return response;
  }

  async getResponse(user: User, res: Response) {
    const tokens = await this.getPairsOfTokens(user);

    const salt = await genSalt(10);
    const hashedRefreshToken = await hash(tokens.refresh_token, salt);

    const updatedUser = await this.userModel.update(
      { refresh_token: hashedRefreshToken },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { user: this.userService.getUserField(updatedUser[1][0]), tokens };
  }

  async getPairsOfTokens(user: User): Promise<any> {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token, refresh_token };
  }
}
