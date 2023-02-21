import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: `email1@mail.uz`,
    description: `User email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `password`, description: `User password` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
