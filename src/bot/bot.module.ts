import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Bot } from './models/bot.model';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
