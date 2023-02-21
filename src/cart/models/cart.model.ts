import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { StadiumTime } from 'src/stadium_times/models/stadium_time.model';
import { User } from 'src/users/models/user.model';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';

interface CartAttrs {
  date: Date;
  createdAt: Date;
  time_for_clear: Date;
}

@Table({ tableName: `cart` })
export class Cart extends Model<Cart, CartAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: `Foreign Key` })
  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;

  @ApiProperty({ example: 1, description: `Foreign Key` })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.BIGINT,
  })
  user_wallet_id: number;

  @ApiProperty({ example: 1, description: `Foreign Key` })
  @ForeignKey(() => StadiumTime)
  @Column({
    type: DataType.BIGINT,
  })
  st_times_id: number;

  @ApiProperty({ example: '01.01.2020', description: `Cart date` })
  @Column({
    type: DataType.DATE,
  })
  date: Date;

  @ApiProperty({ example: '01.01.2020', description: `Created at` })
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @ApiProperty({ example: '01.01.2020', description: `Created at` })
  @Column({
    type: DataType.DATE,
  })
  time_for_clear: Date;

  @ApiProperty({ example: '1', description: `Foreign Key` })
  @Column({
    type: DataType.SMALLINT,
  })
  status_id: number;
}
