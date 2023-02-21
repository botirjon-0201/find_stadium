import { Module } from '@nestjs/common';
import { PaymentForWalletService } from './payment_for_wallet.service';
import { PaymentForWalletController } from './payment_for_wallet.controller';

@Module({
  controllers: [PaymentForWalletController],
  providers: [PaymentForWalletService]
})
export class PaymentForWalletModule {}
