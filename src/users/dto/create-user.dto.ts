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
  @ApiProperty({ example: `ali`, description: `User Name` })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: `valiyev`,
    description: `User Surname`,
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: `user1`, description: `Username` })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: `user1@mail.uz`,
    description: `User Email`,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: `P@$$w0rd`, description: `User Password` })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: `P@$$w0rd`,
    description: `Confirm Password`,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

  @ApiProperty({
    example: `909990909`,
    description: `User Phone Number`,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: `https://t.me/user1`,
    description: `User Telegram Link`,
  })
  @IsNotEmpty()
  @IsString()
  telegram_link: string;

  @ApiProperty({
    example: `user1.img`,
    description: `User Photo`,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  user_photo: string;

  @ApiProperty({
    example: `2000-01-01`,
    description: `User Birthday Date`,
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
}
