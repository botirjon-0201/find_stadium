import { PartialType } from '@nestjs/swagger';
import { CreatePaymentForWalletDto } from './create-payment_for_wallet.dto';

export class UpdatePaymentForWalletDto extends PartialType(CreatePaymentForWalletDto) {}
