import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({ example: 1, description: `Forign Key` })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: `adminstrator`, description: `Adminstrator Name` })
  @IsNotEmpty()
  @IsString()
  contact_with: string;

  @ApiProperty({ example: `stadium`, description: `Stadium Name` })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: `25x50`, description: `Stadium Volume` })
  @IsNotEmpty()
  @IsString()
  volume: string;

  @ApiProperty({
    example: `Home 1, Street Muqumiy`,
    description: `Stadium Address`,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 10, description: `Forign Key` })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;

  @ApiProperty({ example: 100, description: `Forign Key` })
  @IsNotEmpty()
  @IsNumber()
  district_id: number;

  @ApiProperty({
    example: `41.211841, 69.352723`,
    description: `Stadium Location`,
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    example: `2020-01-01`,
    description: `When the Stadium was built`,
  })
  @IsNotEmpty()
  @IsDateString()
  buildAt: Date;

  @ApiProperty({
    example: `07-00`,
    description: `Start time`,
  })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({
    example: `23-30`,
    description: `End time`,
  })
  @IsNotEmpty()
  @IsString()
  end_time: string;
}
