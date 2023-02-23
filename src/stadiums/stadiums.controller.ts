import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OwnerGuard } from 'src/guards/owner.guard';
@ApiTags(`Stadiums`)
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: `Create Stadium` })
  @UseGuards(OwnerGuard) // UserGuard ham qo'shish kerakmi?
  @Post('create')
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @ApiOperation({ summary: `Get All Stadiums` })
  @Get()
  findAll() {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({ summary: `Get Stadium` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @ApiOperation({ summary: `Update Stadium` })
  @UseGuards(OwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @ApiOperation({ summary: `Delete Stadium` })
  @UseGuards(OwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }
}
