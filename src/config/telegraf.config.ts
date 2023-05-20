import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { BotModule } from '../bot/bot.module';

export const getTelegrafConfig: TelegrafModule = {
  botName: BOT_NAME,
  useFactory: () => ({
    token: process.env.BOT_TOKEN,
    middlewares: [],
    include: [BotModule],
  }),
};
