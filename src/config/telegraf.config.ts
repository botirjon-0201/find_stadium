import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { BotModule } from '../bot/bot.module';
import { ConfigService } from '@nestjs/config';

export const getTelegrafConfig = async (
  configService: ConfigService,
): Promise<TelegrafModuleOptions> => ({
  token: configService.get<string>('BOT_TOKEN'),
  botName: configService.get<string>('BOT_NAME'),
  middlewares: [],
  include: [BotModule],
});
