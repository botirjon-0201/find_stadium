import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from 'src/region/models/region.model';
import { Stadium } from 'src/stadiums/models/stadium.model';

interface DistrictAttrs {
  name: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @HasMany(() => Stadium)
  stadium: Stadium[];
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'district', description: 'district name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 1, description: 'Forign Key' })
  @ForeignKey(() => Region)
  @Column({ type: DataType.BIGINT })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region[];
}
