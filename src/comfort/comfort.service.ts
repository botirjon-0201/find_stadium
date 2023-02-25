import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';

@Injectable()
export class ComfortService {
  create(createComfortDto: CreateComfortDto) {
    return 'This action adds a new comfort';
  }

  findAll() {
    return `This action returns all comfort`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comfort`;
  }

  update(id: number, updateComfortDto: UpdateComfortDto) {
    return `This action updates a #${id} comfort`;
  }

  remove(id: number) {
    return `This action removes a #${id} comfort`;
  }
}
