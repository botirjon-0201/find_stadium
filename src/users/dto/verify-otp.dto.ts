import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  check: string;

  @IsNotEmpty()
  @IsString()
  verification_key: string;

  @IsNotEmpty()
  @IsNumberString()
  otp: string;
}
