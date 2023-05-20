import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { Stadium } from './models/stadium.model';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadium) private readonly stadiumModel: typeof Stadium,
  ) {}

  async create(createStadiumDto: CreateStadiumDto) {
    const stadium = await this.stadiumModel.findOne({
      where: {
        category_id: createStadiumDto.category_id,
        name: createStadiumDto.name,
      },
    });
    if (stadium) throw new BadRequestException('Stadion is already exist!');

    const newStadium = await this.stadiumModel.create(createStadiumDto);
    const response = {
      newStadium,
      message: 'New stadium was created',
    };
    return response;
  }

  async findAll() {
    const stadiums = await this.stadiumModel.findAll({
      include: { all: true },
    });
    if (!stadiums) throw new NotFoundException('No any stadiums');

    const response = { stadiums, message: 'All stadiums' };
    return response;
  }

  async findOne(id: number) {
    const stadium = await this.stadiumModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!stadium) throw new NotFoundException('Stadium not found');

    const response = { stadium, message: 'Stadium information' };
    return response;
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const stadium = await this.stadiumModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!stadium) throw new NotFoundException('Stadium not found');

    const updatedStadium = await this.stadiumModel.update(
      { ...updateStadiumDto },
      {
        where: { id }, // category_id ham qo'shish kerakmi?
        returning: true,
      },
    );
    const response = {
      stadium: updatedStadium[1][0],
      message: 'Stadium updated',
    };
    return response;
  }

  async remove(id: number) {
    const stadium = await this.stadiumModel.findOne({
      where: { id },
      include: { all: true },
    });
    if (!stadium) throw new NotFoundException('Stadium not found');
    await this.stadiumModel.destroy({ where: { id } });

    const response = { stadium: id, message: 'Stadium deleted' };
    return response;
  }
}
