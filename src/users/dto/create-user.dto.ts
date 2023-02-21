import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: `user name`, description: `User name` })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: `user surname`,
    description: `User surname`,
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: `user1`, description: `Username` })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: `password`, description: `User password` })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: `confirm_password`,
    description: `Confirm password`,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

  @ApiProperty({
    example: `email1@mail.uz`,
    description: `User email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: `901234567`,
    description: `User phone number`,
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: `01.01.2000`,
    description: `User birthday date`,
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
}
