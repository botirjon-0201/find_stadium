import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  // Nima vazifani bajaradi?
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (user) throw new BadRequestException('Username is already exist!');

    if (createUserDto.password !== createUserDto.confirm_password)
      throw new BadRequestException('Password & confirm password is not match');

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const uniqueKey: string = uuidv4(); 
    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password,
      activation_link: uniqueKey,
    });

    const response = {
      message: `User have registered`,
      ...(await this.getResponse(newUser, res)),
    };
    await this.mailService.sendUserConfirmation(response.user);
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ where: { email } });
    if (!user)
      throw new UnauthorizedException(`Email is wrong or User not registered`);

    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass)
      throw new UnauthorizedException(`Password is not correct`);

    const response = {
      message: `User have logged in`,
      ...(await this.getResponse(user, res)),
    };
    return response;
  }

  async logout(refresh_token: string, res: Response) {
    const userData = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) throw new ForbiddenException(`User not found`);

    const updatedUser = await this.userModel.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie(`refresh_token`);

    const response = {
      message: `User have logged out`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async refreshToken(user_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    if (user_id !== +decodedToken[`id`])
      throw new BadGatewayException(`User id wrong`);

    const user = await this.userModel.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token)
      throw new BadGatewayException(`User not found`);

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) throw new ForbiddenException(`Cannot be access`);

    const response = {
      message: `User token refreshed`,
      ...(await this.getResponse(user, res)),
    };
    return response;
  }

  async getResponse(user: User, res: Response) {
    const tokens = await this.getTokens(user.id, user.is_active, user.is_owner);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userModel.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie(`refresh_token`, tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return { user: updatedUser[1][0], tokens };
  }

  async getTokens(id: number, is_active: boolean, is_owner: boolean) {
    const jwtPayload = { id, is_active, is_owner };

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
