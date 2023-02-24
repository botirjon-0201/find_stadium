import { User } from './users/models/user.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { CategoriesModule } from './categories/categories.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { CartModule } from './cart/cart.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { OrdersModule } from './orders/orders.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { PaymentForWalletModule } from './payment_for_wallet/payment_for_wallet.module';
import { AdminModule } from './admin/admin.module';
import { CommentsModule } from './comments/comments.module';
import { MediaModule } from './media/media.module';
import { Stadium } from './stadiums/models/stadium.model';
import { StadiumTime } from './stadium_times/models/stadium_time.model';
import { Category } from './categories/models/category.model';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';
import { Admin } from './admin/models/admin.model';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: `postgres`,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, User, Category, Stadium, StadiumTime], // Nima vazifani bajaradi?
      autoLoadModels: true,
      synchronize: true, // Ustozdan so'rash kerak
      logging: false,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
