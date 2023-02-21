import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: `name`, description: `Admin name` })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: `surname`,
    description: `Admin surname`,
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: `admin1`, description: `Adminname` })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: `email1@mail.uz`,
    description: `Admin email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `password`, description: `Admin password` })
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
    example: `901234567`,
    description: `Admin phone number`,
  })
  @IsPhoneNumber()
  phone: string;
}
