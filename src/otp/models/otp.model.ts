import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OtpAttrs {
  id: string;
  otp: string;
  expiration_time: Date;
  verified: boolean;
  check: string; // phone
}

@Table({ tableName: 'otp' })
export class Otp extends Model<Otp, OtpAttrs> {
  @ApiProperty({ example: '12345-fdgf-vdfbjh-51vdf', description: 'OTP ID' })
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: '12345-fdgf-vdfbjh-51vdf', description: 'OTP ID' })
  @Column({
    type: DataType.STRING,
  })
  otp: string;

  @ApiProperty({
    example: '2023-02-27807:10:10.00z',
    description: 'expiration time',
  })
  @Column({
    type: DataType.DATE,
  })
  expiration_time: Date;

  @ApiProperty({
    example: 'false',
    description: 'verified',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified: boolean;

  @ApiProperty({
    example: 'checked',
    description: 'check',
  })
  @Column({
    type: DataType.STRING,
  })
  check: string;
}
