import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: `email1@mail.uz`,
    description: `Admin email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `password`, description: `Admin password` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
