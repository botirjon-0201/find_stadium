import { Injectable } from '@nestjs/common';
import { CreatePaymentForWalletDto } from './dto/create-payment_for_wallet.dto';
import { UpdatePaymentForWalletDto } from './dto/update-payment_for_wallet.dto';

@Injectable()
export class PaymentForWalletService {
  create(createPaymentForWalletDto: CreatePaymentForWalletDto) {
    return 'This action adds a new paymentForWallet';
  }

  findAll() {
    return `This action returns all paymentForWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentForWallet`;
  }

  update(id: number, updatePaymentForWalletDto: UpdatePaymentForWalletDto) {
    return `This action updates a #${id} paymentForWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentForWallet`;
  }
}
