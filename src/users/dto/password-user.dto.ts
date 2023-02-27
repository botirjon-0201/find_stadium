import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class PasswordUserDto {
  @ApiProperty({
    example: `P@$$w0rd`,
    description: `User Password`,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: `P@$$w0rd1`, description: `User New Password` })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  new_password: string;

  @ApiProperty({
    example: `P@$$w0rd1`,
    description: `Confirm New Password`,
  })
  @IsNotEmpty()
  @IsString()
  confirm_new_password: string;
}
