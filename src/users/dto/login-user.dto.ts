import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: `user1@mail.uz`,
    description: `User Email`,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: `P@$$w0rd`, description: `User Password` })
  @IsNotEmpty()
  @IsString()
  password: string;
}
