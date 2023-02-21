import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from 'src/stadiums/models/stadium.model';

interface StadiumTimeAttrs {
  start_time: Date;
  end_time: Date;
  price: number;
}

@Table({ tableName: `stadium_times` })
export class StadiumTime extends Model<StadiumTime, StadiumTimeAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: `Forign Key` })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.SMALLINT,
  })
  stadium_id: number;

  @ApiProperty({
    example: `07-00`,
    description: `Start time`,
  })
  @Column({
    type: DataType.DATE,
  })
  start_time: Date;

  @ApiProperty({
    example: `23-00`,
    description: `End time`,
  })
  @Column({
    type: DataType.DATE,
  })
  end_time: Date;

  @ApiProperty({
    example: `120000`,
    description: `Price`,
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;
}
