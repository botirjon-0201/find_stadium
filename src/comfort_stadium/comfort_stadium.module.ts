import { Module } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { ComfortStadiumController } from './comfort_stadium.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComfortStadium } from './models/comfort_stadium.model';

@Module({
  imports: [SequelizeModule.forFeature([ComfortStadium])],
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService],
})
export class ComfortStadiumModule {}
