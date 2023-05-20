import { Module } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';
import { Comfort } from './models/comfort.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Comfort])],
  controllers: [ComfortController],
  providers: [ComfortService],
})
export class ComfortModule {}
