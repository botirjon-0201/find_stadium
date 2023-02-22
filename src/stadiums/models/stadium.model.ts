import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/categories/models/category.model';
import { User } from 'src/users/models/user.model';

interface StadiumAttrs {
  contact_with: string;
  name: string;
  volume: string;
  address: string;
  location: string;
  buildAt: Date;
  start_time: string;
  end_time: string;
}

@Table({ tableName: `stadiums` })
export class Stadium extends Model<Stadium, StadiumAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: `Unique ID` }) // to'liqmas
  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
  })
  category_id: number;

  @ApiProperty({ example: 1, description: `Forign Key` }) // Savol bor
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  owner_id: number;

  @ApiProperty({ example: `adminstrator`, description: `adminstrator name` })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({
    example: `stadium`,
    description: `stadium name`,
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: `volume`,
    description: `volume`,
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: `address`,
    description: `stadium address`,
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: 1, description: `Forign Key` })
  //   @ForeignKey(()=>Region)
  @Column({
    type: DataType.SMALLINT,
  })
  region_id: number;

  @ApiProperty({ example: 1, description: `Forign Key` })
  //   @ForeignKey(()=>City)
  @Column({
    type: DataType.SMALLINT,
  })
  city_id: number;

  @ApiProperty({ example: 1, description: `Forign Key` })
  @Column({
    type: DataType.SMALLINT,
  })
  district_id: number;

  @ApiProperty({
    example: `location`,
    description: `stadium location`,
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: `01.01.2020`,
    description: `When the stadium was built`,
  })
  @Column({
    type: DataType.DATE,
  })
  buildAt: Date;

  @ApiProperty({
    example: `17-00`,
    description: `Start time`,
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: `17-30`,
    description: `End time`,
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;
}
