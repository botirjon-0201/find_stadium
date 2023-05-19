import { User } from './models/user.model';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PasswordUserDto } from './dto/password-user.dto';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenaretor from 'otp-generator';
import { BotService } from 'src/bot/bot.service';
import { addMinutesToDate } from 'src/helpers/addMinutes';
import { Otp } from 'src/otp/models/otp.model';
import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { dates, decode, encode } from 'src/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly botService: BotService,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    const users = await this.userModel.findAll();
    if (!users) throw new NotFoundException(`No any users`);

    const response = { users, message: `All users` };
    return response;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const response = { user, message: `User information` };
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      {
        where: { id },
        returning: true,
      },
    );

    const response = {
      message: `User updated successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async updatePassword(id: number, passwordUserDto: PasswordUserDto) {
    const { password, new_password, confirm_new_password } = passwordUserDto;
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass)
      throw new UnauthorizedException(`Password is not correct`);

    if (new_password !== confirm_new_password)
      throw new BadRequestException(`Password and confirm not match`);

    const hashedPassword = await bcrypt.hash(new_password, 7);
    const updatedUser = await this.userModel.update(
      { password: hashedPassword },
      { where: { id: user.id }, returning: true },
    );

    const response = {
      message: `Password updated successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async activate(link: string) {
    const updatedUser = await this.userModel.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      },
    );

    const response = {
      message: `User activate successfully`,
      user: updatedUser[1][0],
    };
    return response;
  }

  async deactivate(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { is_active: false },
      {
        where: { id },
        returning: true,
      },
    );

    const response = {
      user: updatedUser[1][0],
      message: `User deactivate successfully`,
    };
    return response;
  }

  async isOwner(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);

    const updatedUser = await this.userModel.update(
      { is_owner: !user.is_owner },
      {
        where: { id },
        returning: true,
      },
    );
    const response = { user: updatedUser[1][0], message: `User is_owner` };
    return response;
  }

  async remove(id: number) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException(`User not found`);
    await this.userModel.destroy({ where: { id } });

    const response = { user: id, message: `User deleted successfully` };
    return response;
  }

  async newOTP(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;
    const user = await this.userModel.findOne({
      where: { phone: phone_number },
    });
    if (!user)
      throw new NotFoundException('User not found, please, first register!');

    const otp = otpGenaretor.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOTP(phone_number, otp);
    if (!isSend)
      throw new HttpException(
        'First register from the bot',
        HttpStatus.BAD_REQUEST,
      );

    const now = new Date();
    const expiration_time = addMinutesToDate(now, 5);

    await this.otpModel.destroy({
      where: { [Op.and]: [{ check: phone_number }, { verified: false }] },
    });

    const new_otp = await this.otpModel.create({
      id: v4(),
      otp,
      expiration_time,
      check: phone_number,
    });

    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: 'OTP send to user',
      otp_id: new_otp.id,
    };

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Success', Details: encoded };
  }

  async verifyOtp(
    verifyOtpDto: VerifyOtpDto,
    // headers: { 'user-agent': string },
    res: Response,
  ) {
    const { verification_key, otp, check } = verifyOtpDto;
    const currentDate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;

    if (check_obj !== check)
      throw new BadRequestException('OTP has not been sent to this number');

    const result = await this.otpModel.findOne({
      where: { id: obj.otp_id },
      include: { all: true },
    });

    if (result !== null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentDate)) {
          if (otp === result.otp) {
            const user = await this.userModel.findOne({
              where: { phone: check },
            });
            if (user) {
              const updatedUser = await this.userModel.update(
                { is_owner: true },
                { where: { id: user.id }, returning: true },
              );
              const response = {
                message: `User have done owner`,
                ...(await this.authService.getResponse(updatedUser[1][0], res)),
              };
              return response;
            } else {
              throw new BadRequestException('Please, first register!');
            }
          } else {
            throw new BadRequestException('OTP is not match');
          }
        } else {
          throw new BadRequestException('OTP expired in');
        }
      } else {
        throw new BadRequestException('This OTP is already used');
      }
    } else {
      throw new NotFoundException('No such user found');
    }
  }
}
