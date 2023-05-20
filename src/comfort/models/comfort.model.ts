import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ComfortStadium } from 'src/comfort_stadium/models/comfort_stadium.model';

interface ComfortAttrs {
  name: string;
}

@Table({ tableName: 'comfort' })
export class Comfort extends Model<Comfort, ComfortAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @HasMany(() => ComfortStadium)
  comfortStadium: ComfortStadium[];
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'comfort', description: 'comfort name' })
  @Column({ type: DataType.STRING })
  name: string;
}
