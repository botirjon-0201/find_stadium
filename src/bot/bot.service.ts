import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from 'src/app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { Bot } from './models/bot.model';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}

  async start(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      await this.botModel.create({
        user_id: userId,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });
      await ctx.reply(
        `Iltimos, <b>"Tel raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.dataValues.status) {
      await ctx.reply(
        `Iltimos, <b>"Tel raqamni yuborish"</b> tugmasini bosing!`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
      await this.bot.telegram.sendChatAction(userId, 'typing');
      await ctx.reply(
        "Bu bot orqali Stadion dasturi bilan muloqot o'rnatiladi",
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async contact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findOne({
        where: { user_id: userId },
      });

      if (!user) {
        await ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing!`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([[Markup.button.contactRequest('/Start')]])
            .oneTime()
            .resize(),
        });
      } else if (ctx.message.contact.user_id !== userId) {
        await ctx.reply(`Iltimos, o'zingizni raqamingizni yuboring!`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      } else {
        let phone: string;
        ctx.message.contact.phone_number[0] === '+'
          ? (phone = ctx.message.contact.phone_number)
          : (phone = '+' + ctx.message.contact.phone_number);

        await this.botModel.update(
          { phone_number: phone, status: true },
          { where: { user_id: userId }, returning: true },
        );

        await ctx.reply(`Tabriklamiz, ro'yxatdan o'tdingiz!`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async stop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findOne({
      where: { user_id: userId },
    });

    if (user.dataValues.status) {
      await this.botModel.update(
        {
          status: false,
          phone_number: null,
        },
        { where: { user_id: userId } },
      );
      await ctx.reply(`Botdan chiqib ketdingiz!`, {
        parse_mode: 'HTML',
        ...Markup.keyboard(['/start']).oneTime().resize(),
      });
    }
  }

  async sendOTP(phoneNumber: string, OTP: string): Promise<boolean> {
    const user = await this.botModel.findOne({
      where: { phone_number: '+' + phoneNumber },
    });
    if (!user || !user.dataValues.status) return false;

    await this.bot.telegram.sendChatAction(user.user_id, 'typing');
    await this.bot.telegram.sendMessage(user.user_id, 'Verify code: ' + OTP);
    return true;
  }
}
