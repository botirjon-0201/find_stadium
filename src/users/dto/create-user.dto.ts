import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ali', description: 'User First Name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'valiyev', description: 'User Last Name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'ali_1', description: 'Username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'ali@mail.uz', description: 'User Email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@$$w0rd', description: 'User Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'P@$$w0rd', description: 'Confirm Password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

  @ApiProperty({ example: '+998909090909', description: 'User Phone Number' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'https://t.me/ali',
    description: 'User Telegram Link',
  })
  @IsNotEmpty()
  @IsString()
  telegram_link: string;

  @ApiProperty({ example: 'ali.img', description: 'User Photo' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  user_photo: string;

  @ApiProperty({ example: '2000-01-01', description: 'User Birthday Date' })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
}
