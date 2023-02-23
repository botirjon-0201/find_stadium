import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { Stadium } from './models/stadium.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Stadium]), JwtModule.register({})],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
