import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from '../users/users.module';
import { getJWTConfig } from '../config/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register(getJWTConfig),
    UsersModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
