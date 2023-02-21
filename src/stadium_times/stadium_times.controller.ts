import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';

@Controller('stadium-times')
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

  @Post()
  create(@Body() createStadiumTimeDto: CreateStadiumTimeDto) {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

  @Get()
  findAll() {
    return this.stadiumTimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumTimesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumTimeDto: UpdateStadiumTimeDto) {
    return this.stadiumTimesService.update(+id, updateStadiumTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumTimesService.remove(+id);
  }
}
