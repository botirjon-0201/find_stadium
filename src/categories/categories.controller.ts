import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags(`Categories`)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: `Create Category` })
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: `Find All Category` })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: `Get Category` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({ summary: `Update Category` })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: `Delete Category` })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
