import { Module } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { UserWalletController } from './user_wallet.controller';

@Module({
  controllers: [UserWalletController],
  providers: [UserWalletService],
})
export class UserWalletModule {}
