import { Test, TestingModule } from '@nestjs/testing';
import { PaymentForWalletController } from './payment_for_wallet.controller';
import { PaymentForWalletService } from './payment_for_wallet.service';

describe('PaymentForWalletController', () => {
  let controller: PaymentForWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentForWalletController],
      providers: [PaymentForWalletService],
    }).compile();

    controller = module.get<PaymentForWalletController>(PaymentForWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
