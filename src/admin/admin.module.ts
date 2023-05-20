import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '../config/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register(getJWTConfig),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
