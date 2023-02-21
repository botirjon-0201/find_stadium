import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateUserWalletDto {
  @ApiProperty({ example: 1000, description: `User wallet` })
  @IsNumber()
  wallet: number;
}
