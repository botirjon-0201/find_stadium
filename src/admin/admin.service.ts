import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { compare, genSalt, hash } from 'bcrypt';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PasswordAdminDto } from './dto/password-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, password, confirm_password } = createAdminDto;

    const admin = await this.findByEmail(email);
    if (admin)
      throw new BadRequestException('Admin with that email is already exist!');

    if (password !== confirm_password)
      throw new BadRequestException('Password & confirm password is not match');

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    const response = {
      newAdmin: this.getAdminField(newAdmin),
      message: 'New Admin created successfully!',
    };
    return response;
  }

  async signin(loginadminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginadminDto;

    const admin = await this.findByEmail(email);
    if (!admin)
      throw new UnauthorizedException('Email is wrong or Admin not registered');

    const isMatchPass = await compare(password, admin.password);
    if (!isMatchPass)
      throw new BadRequestException("Password isn't correct, please try again");

    const response = {
      ...(await this.getResponse(admin, res)),
      message: 'Admin have signed in successfully!',
    };
    return response;
  }

  async signout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) throw new ForbiddenException('Admin not found');

    const updatedAdmin = await this.adminModel.update(
      { refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    res.clearCookie('refresh_token');

    const response = {
      admin: this.getAdminField(updatedAdmin[1][0]),
      message: 'Admin have signed out successfully!',
    };
    return response;
  }

  async refreshToken(admin_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtService.decode(refresh_token);
    if (admin_id !== decodedToken['id'])
      throw new BadGatewayException('Admin id wrong, please try again');

    const admin = await this.findById(admin_id);
    if (!admin || !admin.refresh_token)
      throw new BadGatewayException('Admin not found');

    const tokenMatch = await compare(refresh_token, admin.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Cannot be access');

    const response = {
      ...(await this.getResponse(admin, res)),
      message: 'Admin token refreshed',
    };
    return response;
  }

  async findAll() {
    const admins = await this.adminModel.findAll({ include: { all: true } });
    if (!admins) throw new NotFoundException('No any Admins');

    const response = { admins, message: 'All Admins' };
    return response;
  }

  async findOne(id: number) {
    const admin = await this.findById(id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');

    const response = { admin, message: 'Admin Information' };
    return response;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findById(id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');

    const updatedAdmin = await this.adminModel.update(
      { ...updateAdminDto },
      { where: { id }, returning: true },
    );

    const response = {
      admin: this.getAdminField(updatedAdmin[1][0]),
      message: 'Admin information updated successfully!',
    };
    return response;
  }

  async remove(id: number) {
    const admin = await this.findById(id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');
    await this.adminModel.destroy({ where: { id } });

    const response = { message: `This action removes a #${id} admin` };
    return response;
  }

  async activete(id: number) {
    const admin = await this.findById(id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');

    const updatedAdmin = await this.adminModel.update(
      { is_active: true },
      { where: { id }, returning: true },
    );

    const response = {
      admin: this.getAdminField(updatedAdmin[1][0]),
      message: 'Admin activated successfully',
    };
    return response;
  }

  async deactivete(id: number) {
    const admin = await this.findById(id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');

    const updatedAdmin = await this.adminModel.update(
      { is_active: false },
      { where: { id }, returning: true },
    );

    const response = {
      admin: this.getAdminField(updatedAdmin[1][0]),
      message: 'Admin deactivated successfully',
    };
    return response;
  }

  async updatePassword(admin_id: number, passwordAdminDto: PasswordAdminDto) {
    const { password, new_password, confirm_password } = passwordAdminDto;

    const admin = await this.findById(admin_id);
    if (!admin) throw new UnauthorizedException('Admin Not Found');

    const isMatchPass = await compare(password, admin.password);
    if (!isMatchPass)
      throw new UnauthorizedException('Password is wrong, please try again');

    if (new_password !== confirm_password)
      throw new BadRequestException('Password and confirm password not match');

    const salt = await genSalt(10);
    const hashedPassword = await hash(new_password, salt);

    const updatedAdmin = await this.adminModel.update(
      { password: hashedPassword },
      { where: { id: admin.id }, returning: true },
    );

    const response = {
      admin: this.getAdminField(updatedAdmin[1][0]),
      message: 'Password updated successfully',
    };
    return response;
  }

  async findById(id: number): Promise<Admin> {
    return await this.adminModel.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async findByEmail(email: string): Promise<Admin> {
    return await this.adminModel.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getResponse(admin: Admin, res: Response) {
    const tokens = await this.getPairsOfTokens(admin);

    const salt = await genSalt(10);
    const hashedRefreshToken = await hash(tokens.refresh_token, salt);

    const updatedadmin = await this.adminModel.update(
      { refresh_token: hashedRefreshToken },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { admin: this.getAdminField(updatedadmin[1][0]), tokens };
  }

  async getPairsOfTokens(admin: Admin): Promise<any> {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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

  getAdminField(admin: Admin) {
    return {
      id: admin.id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      username: admin.username,
      email: admin.email,
      phone: admin.phone,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
  }
}
