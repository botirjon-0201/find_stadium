import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class PhoneUserDto {
  @ApiProperty({ example: `+998901234567`, description: `User Phone Number` })
  @IsNotEmpty()
  @IsPhoneNumber()
  // @Matches(/^998([378]{2}|(9[013]))/i)
  phone: string;
}
