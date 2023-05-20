import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Otp } from './models/otp.model';
import { PhoneUserDto } from '../users/dto/phone-user.dto';
import { VerifyOtpDto } from '../users/dto/verify-otp.dto';
import { Response } from 'express';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ApiOperation({ summary: 'Send OTP' })
  @ApiResponse({ status: 200, type: Otp })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AdminGuard)
  @Post('send-otp/:id')
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.otpService.newOTP(phoneUserDto);
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @Post('/verify')
  verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ): any {
    return this.otpService.verifyOtp(verifyOtpDto, res);
  }
}
