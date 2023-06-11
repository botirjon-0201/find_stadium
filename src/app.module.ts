import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { CartModule } from './cart/cart.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { OrdersModule } from './orders/orders.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { PaymentForWalletModule } from './payment_for_wallet/payment_for_wallet.module';
import { AdminModule } from './admin/admin.module';
import { CommentsModule } from './comments/comments.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ComfortModule } from './comfort/comfort.module';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { OtpModule } from './otp/otp.module';
import { CategoriesModule } from './categories/categories.module';
import { getSequelizeConfig } from './config/sequalize.config';
import { getFilePathConfig } from './config/filepath.config';
import { getTelegrafConfig } from './config/telegraf.config';

@Module({
  imports: [
    ConfigModule.forRoot(getFilePathConfig()),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSequelizeConfig,
      inject: [ConfigService],
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegrafConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    StadiumsModule,
    CategoriesModule,
    StadiumTimesModule,
    CartModule,
    UserCardsModule,
    OrdersModule,
    UserWalletModule,
    PaymentForWalletModule,
    AdminModule,
    CommentsModule,
    MediaModule,
    AuthModule,
    MailModule,
    RegionModule,
    DistrictModule,
    ComfortModule,
    ComfortStadiumModule,
    BotModule,
    OtpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
