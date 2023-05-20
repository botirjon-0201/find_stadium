import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

interface UserWalletAttrs {
  wallet: number;
}

@Table({ tableName: 'user_wallet' })
export class UserWallet extends Model<UserWallet, UserWalletAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Foreign Key' })
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  user_id: number;

  @ApiProperty({ example: 1000, description: 'User wallet' })
  @Column({ type: DataType.BIGINT })
  wallet: number;
}
