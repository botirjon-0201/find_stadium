import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { District } from 'src/district/models/district.model';
import { Stadium } from 'src/stadiums/models/stadium.model';

interface RegionAttrs {
  name: string;
}

@Table({ tableName: `region` })
export class Region extends Model<Region, RegionAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @HasMany(() => Stadium)
  stadium: Stadium[];
  @HasMany(() => District)
  district: District[];
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: `region`,
    description: `region name`,
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
