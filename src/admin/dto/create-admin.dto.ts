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
  @ApiProperty({ example: 'ali', description: 'Admin First Name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'valiyev', description: 'Admin Last Name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'admin1', description: 'Admin Username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin1@mail.uz', description: 'Admin Email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Admin password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'confirm_password', description: 'Confirm password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

  @ApiProperty({ example: '+998909090909', description: 'Admin Phone Number' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
