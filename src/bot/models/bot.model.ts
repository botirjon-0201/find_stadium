import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface BotAttrs {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: boolean;
}

@Table({ tableName: 'bot' })
export class Bot extends Model<Bot, BotAttrs> {
  @ApiProperty({ example: 123456789, description: `User ID` })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  user_id: number;

  @ApiProperty({ example: `username`, description: `Username` })
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @ApiProperty({ example: `name`, description: `First Name` })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({ example: `surname`, description: `Last Name` })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: `+998901234567`, description: `Phone Number` })
  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @ApiProperty({ example: `false`, description: `Status` })
  @Column({
    type: DataType.BOOLEAN,
  })
  status: boolean;
}
