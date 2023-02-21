import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentForWalletService } from './payment_for_wallet.service';
import { CreatePaymentForWalletDto } from './dto/create-payment_for_wallet.dto';
import { UpdatePaymentForWalletDto } from './dto/update-payment_for_wallet.dto';

@Controller('payment-for-wallet')
export class PaymentForWalletController {
  constructor(private readonly paymentForWalletService: PaymentForWalletService) {}

  @Post()
  create(@Body() createPaymentForWalletDto: CreatePaymentForWalletDto) {
    return this.paymentForWalletService.create(createPaymentForWalletDto);
  }

  @Get()
  findAll() {
    return this.paymentForWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentForWalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentForWalletDto: UpdatePaymentForWalletDto) {
    return this.paymentForWalletService.update(+id, updatePaymentForWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentForWalletService.remove(+id);
  }
}
