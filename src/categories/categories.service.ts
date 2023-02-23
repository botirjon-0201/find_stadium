import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      where: { name: createCategoryDto.name },
    });
    if (category) throw new BadRequestException('Stadion is already exist!');

    const newCategory = await this.categoryModel.create(createCategoryDto);
    const response = {
      newStadium: newCategory,
      message: `New category was created`,
    };

    return response;
  }

  async findAll() {
    const categories = await this.categoryModel.findAll({
      include: { all: true },
    });
    if (!categories) throw new NotFoundException(`No any categories`);

    const response = { categories, message: `All categories` };
    return response;
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!category) throw new NotFoundException(`Category not found`);

    const response = { category, message: `Category information` };
    return response;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Stadium not found`);

    const updatedCategory = await this.categoryModel.update(
      { ...updateCategoryDto },
      {
        where: { id },
        returning: true,
      },
    );
    const response = {
      stadium: updatedCategory[1][0],
      message: `category updated`,
    };
    return response;
  }

  async remove(id: number) {
    const category = await this.categoryModel.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Category not found`);
    await this.categoryModel.destroy({ where: { id } });

    const response = { category: id, message: `Category deleted` };
    return response;
  }
}
