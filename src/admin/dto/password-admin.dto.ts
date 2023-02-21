import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class PasswordAdminDto {
  @ApiProperty({
    example: `password`,
    description: `Admin password`,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: `newPassword`, description: `Admin new password` })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  newPassword: string;

  @ApiProperty({
    example: `confirm_password`,
    description: `Confirm password`,
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
