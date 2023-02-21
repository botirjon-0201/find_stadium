import { StadiumTime } from './models/stadium_time.model';
import { Module } from '@nestjs/common';
import { StadiumTimesService } from './stadium_times.service';
import { StadiumTimesController } from './stadium_times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stadium } from 'src/stadiums/models/stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTime, Stadium])], // stadium nima uchun kerak?
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService],
})
export class StadiumTimesModule {}
