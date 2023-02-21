import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class PasswordUserDto {
  @ApiProperty({
    example: `password`,
    description: `User password`,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: `newPassword`, description: `User new password` })
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
