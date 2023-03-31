import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ComfortStadium } from 'src/comfort_stadium/models/comfort_stadium.model';
import { District } from 'src/district/models/district.model';
import { Region } from 'src/region/models/region.model';
import { User } from 'src/users/models/user.model';
import { Category } from '../../categories/models/category.model';

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
  @HasMany(() => ComfortStadium)
  comfortStadium: ComfortStadium[];
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: `Forign Key` })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 1, description: `Forign Key` })
  // @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  owner_id: number;

  // @BelongsTo(() => User)
  // user: User;

  @ApiProperty({ example: `adminstrator`, description: `Adminstrator Name` })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({
    example: `stadium`,
    description: `Stadium Name`,
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: `25x50`,
    description: `Stadium Volume`,
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: `Home 1, Street Muqumiy`,
    description: `Stadium Address`,
  })
  @Column({
    type: DataType.STRING,
  })
  address: string;

  @ApiProperty({ example: 1, description: `Forign Key` })
  // // @ForeignKey(() => Region)
  @Column({
    type: DataType.BIGINT,
  })
  region_id: number;

  // @BelongsTo(() => Region)
  // region: Region;

  @ApiProperty({ example: 1, description: `Forign Key` })
  // // @ForeignKey(() => District)
  @Column({
    type: DataType.BIGINT,
  })
  district_id: number;

  // @BelongsTo(() => District)
  // district: District;

  @ApiProperty({
    example: `41.211841, 69.352723`,
    description: `Stadium Location`,
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: `2020-01-01`,
    description: `When the Stadium was built`,
  })
  @Column({
    type: DataType.DATE,
  })
  buildAt: Date;

  @ApiProperty({
    example: `07-00`,
    description: `Start time`,
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: `23-30`,
    description: `End time`,
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;
}
