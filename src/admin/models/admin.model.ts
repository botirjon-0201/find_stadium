import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  hashed_password: string;
  phone: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: `admin` })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `name`, description: `Admin name` })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: `surname`,
    description: `Admin surname`,
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: `admin1`, description: `Admin username` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: `email1@mail.uz`,
    description: `Admin email`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: `password`, description: `Admin password` })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: `901234567`,
    description: `Admin phone number`,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: `false`,
    description: `Admin active or not active`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: `false`,
    description: `Admin creator or not creator`,
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: `token`,
    description: `Admin token`,
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
