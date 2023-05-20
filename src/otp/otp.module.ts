import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { BotModule } from '../bot/bot.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Otp, User]),
    UsersModule,
    BotModule,
    AuthModule,
  ],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
