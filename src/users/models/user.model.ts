import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttrs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  hashed_password: string;
  phone: string;
  telegram_link: string;
  user_photo: string;
  birthday: Date;
  is_owner: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
  activation_link: string;
}

@Table({ tableName: `users` })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `ali`, description: `User Name` })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: `valiyev`,
    description: `User Surname`,
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: `user1`, description: `Username` })
  @Column({
    type: DataType.STRING,
    allowNull: false, // Nima bu?
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: `user1@mail.uz`,
    description: `User Email`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: `P@$$w0rd`, description: `User Password` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: `909990909`,
    description: `User Phone Number`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: `https://t.me/user1`,
    description: `User Telegram Link`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telegram_link: string;

  @ApiProperty({
    example: `user1.img`,
    description: `User Photo`,
  })
  @Column({
    type: DataType.STRING,
    defaultValue: `../../../../../Downloads/User-avatar.svg.png`,
  })
  user_photo: string;

  @ApiProperty({
    example: `2000-01-01`,
    description: `User Birthday Date`,
  })
  @Column({
    type: DataType.DATE,
  })
  birthday: Date;

  @ApiProperty({
    example: `false`,
    description: `Stadium's Owner or Not Owner`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @ApiProperty({
    example: `false`,
    description: `User Active or Not Active`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: `link`,
    description: `Activation Link`,
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({
    example: `token`,
    description: `User Token`,
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
