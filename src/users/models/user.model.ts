import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttrs {
  first_name: string;
  last_name: string;
  username: string;
  hashed_password: string;
  email: string;
  phone: string;
  birthday: Date;
  is_owner: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
  activation_link: string;
  // scopes: {
  //   withoutPassword: {
  //     attributes: { exclude: ['hashed_password'] };
  //   };
  // };
}

@Table({ tableName: `users` })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `user name`, description: `User name` })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: `user surname`,
    description: `User surname`,
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: `user1`, description: `Username` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({ example: `password`, description: `User password` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: `email1@mail.uz`,
    description: `User email`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: `901234567`,
    description: `User phone number`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: `01.01.2000`,
    description: `User birthday date`,
  })
  @Column({
    type: DataType.DATE,
  })
  birthday: Date;

  @ApiProperty({
    example: `false`,
    description: `Stadium's owner or not owner`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @ApiProperty({
    example: `false`,
    description: `User active or not active`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: `token`,
    description: `User token`,
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({
    example: `link`,
    description: `activation link`,
  })
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
