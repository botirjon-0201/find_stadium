import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({ example: `adminstrator`, description: `adminstrator name` })
  @IsString()
  @IsNotEmpty()
  contact_with: string;

  @ApiProperty({ example: `stadium`, description: `stadium name` })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: `volume`, description: `volume` })
  @IsString()
  @IsNotEmpty()
  volume: string;

  @ApiProperty({ example: `address`, description: `stadium address` })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: `location`,
    description: `stadium location`,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: `01.01.2020`,
    description: `When the stadium was built`,
  })
  @IsDateString()
  @IsNotEmpty()
  buildAt: Date;

  @ApiProperty({
    example: `17-00`,
    description: `Start time`,
  })
  @IsDateString()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    example: `17-30`,
    description: `End time`,
  })
  @IsDateString()
  @IsNotEmpty()
  end_time: Date;
}
