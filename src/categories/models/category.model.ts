import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Stadium } from 'src/stadiums/models/stadium.model';

interface CategoryAttrs {
  name: string;
}

@Table({ tableName: `categories` })
export class Category extends Model<Category, CategoryAttrs> {
  @ApiProperty({ example: 1, description: `Unique ID` })
  @HasMany(() => Stadium)
  stadium: Stadium;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `category name`, description: `Category name` })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1, description: `Forign Key` })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.SMALLINT,
  })
  parent_id: number;
}
