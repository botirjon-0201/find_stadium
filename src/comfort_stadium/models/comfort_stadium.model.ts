import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comfort } from 'src/comfort/models/comfort.model';
import { Stadium } from 'src/stadiums/models/stadium.model';

@Table({ tableName: 'comfort_stadium' })
export class ComfortStadium extends Model<ComfortStadium> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Forign key' })
  @ForeignKey(() => Stadium)
  @Column({ type: DataType.BIGINT })
  stadium_id: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium[];

  @ApiProperty({ example: 1, description: 'Forign key' })
  @ForeignKey(() => Comfort)
  @Column({ type: DataType.BIGINT })
  comfort_id: number;

  @BelongsTo(() => Comfort)
  comfort: Comfort[];
}
