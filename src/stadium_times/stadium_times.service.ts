import { Injectable } from '@nestjs/common';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';

@Injectable()
export class StadiumTimesService {
  create(createStadiumTimeDto: CreateStadiumTimeDto) {
    return 'This action adds a new stadiumTime';
  }

  findAll() {
    return `This action returns all stadiumTimes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stadiumTime`;
  }

  update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto) {
    return `This action updates a #${id} stadiumTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} stadiumTime`;
  }
}
