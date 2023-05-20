import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PhoneUserDto } from '../users/dto/phone-user.dto';
import { generate } from 'otp-generator';
import { BotService } from '../bot/bot.service';
import { addMinutesToDate } from '../helpers/addMinutes';
import { Otp } from './models/otp.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { v4 } from 'uuid';
import { dates, decode, encode } from '../helpers/crypto';
import { VerifyOtpDto } from '../users/dto/verify-otp.dto';
import { User } from '../users/models/user.model';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly userService: UsersService,
    private readonly botService: BotService,
    private readonly authService: AuthService,
  ) {}

  async newOTP(phoneUserDto: PhoneUserDto) {
    const phone_number = phoneUserDto.phone;

    const user = await this.userService.findByPhone(phone_number);
    if (!user)
      throw new UnauthorizedException('User not found, please first register!');

    const otp = generate(4, {
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
    return {
      detail: encoded,
      status: 'Verification code has been sent, check your telegram messages',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
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
            const user = await this.userService.findByPhone(check);
            if (user) {
              const updatedUser = await this.userModel.update(
                { is_owner: true },
                { where: { id: user.id }, returning: true },
              );

              const response = {
                ...(await this.authService.getResponse(updatedUser[1][0], res)),
                message: 'User have done owner',
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
