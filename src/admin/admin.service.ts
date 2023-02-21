import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PasswordAdminDto } from './dto/password-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (admin) throw new BadRequestException(`Admin is already exist!`);

    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords is not match');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const response = await this.getResponse(
      newAdmin,
      res,
      `Admin have registered`,
    );
    return response;
  }

  async login(loginUserDto: LoginAdminDto, res: Response) {
    const { email, password } = loginUserDto;

    const admin = await this.adminModel.findOne({ where: { email } });
    if (!admin)
      throw new UnauthorizedException(`Email is not correct or not registered`);

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass)
      throw new UnauthorizedException(`Password is not correct`);

    const response = await this.getResponse(admin, res, `Admin have logged in`);
    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id !== decodedToken[`id`])
      throw new BadGatewayException(`Admin id wrong`);

    const admin = await this.adminModel.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token)
      throw new BadGatewayException(`Admin not found`);

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );

    if (!tokenMatch) throw new ForbiddenException(`Cannot be access`);
    const response = await this.getResponse(admin, res, `Admin refreshed`);
    return response;
  }

  async getResponse(admin: Admin, res: Response, msg: string) {
    const tokens = await this.getTokens(
      admin.id,
      admin.is_active,
      admin.is_creator,
    );

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );

    res.cookie(`refresh_token`, tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = { message: msg, admin: updatedAdmin[1][0], tokens };
    return response;
  }

  async getTokens(id: number, is_active: boolean, is_creator: boolean) {
    const jwtPayload = { id, is_active, is_creator };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) throw new ForbiddenException(`Admin not found`);

    const updatedAdmin = await this.adminModel.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    res.clearCookie(`refresh_token`);

    const response = {
      message: `Admin have logged out`,
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  async findAll() {
    const admins = await this.adminModel.findAll();
    const response = { admins, message: `All admins` };
    return response;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });
    if (!admin) throw new UnauthorizedException(`Admin not found`);
    const response = { admin, message: `Admin information` };
    return response;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.adminModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedAdmin = await this.adminModel.update(
      { ...updateAdminDto },
      {
        where: { id },
        returning: true,
      },
    );
    const response = { admin: updatedAdmin[1][0], message: `Admin updated` };
    return response;
  }

  async updatePassword(user_id: number, passwordAdminDto: PasswordAdminDto) {
    const { password, newPassword, confirm_password } = passwordAdminDto;

    const admin = await this.adminModel.findOne({ where: { id: user_id } });
    if (!admin) throw new UnauthorizedException(`Admin not found`);

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass)
      throw new UnauthorizedException(`Password is not correct`);

    if (newPassword !== confirm_password)
      throw new BadRequestException(`Password and confirm not match`);

    const hashed_password = await bcrypt.hash(newPassword, 7);
    const updatedAdmin = await this.adminModel.update(
      { hashed_password },
      { where: { id: admin.id }, returning: true },
    );

    const response = { admin: updatedAdmin[1][0], message: `password updated` };
    return response;
  }

  async isActive(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });
    if (!admin) throw new UnauthorizedException(`Admin not found`);

    const updatedAdmin = await this.adminModel.update(
      { is_active: !admin.is_active },
      {
        where: { id },
        returning: true,
      },
    );
    const response = { admin: updatedAdmin[1][0], message: `Admin is_active` };
    return response;
  }

  async isCreator(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });
    if (!admin) throw new UnauthorizedException(`Admin not found`);

    const updatedAdmin = await this.adminModel.update(
      { is_creator: !admin.is_creator },
      {
        where: { id },
        returning: true,
      },
    );
    const response = { admin: updatedAdmin[1][0], message: `Admin is_creator` };
    return response;
  }

  async remove(id: number) {
    const admin = await this.adminModel.findOne({ where: { id } });
    if (!admin) throw new UnauthorizedException(`User not found`);
    await this.adminModel.destroy({ where: { id } });

    const response = { admin: id, message: `Admin deleted` };
    return response;
  }
}
