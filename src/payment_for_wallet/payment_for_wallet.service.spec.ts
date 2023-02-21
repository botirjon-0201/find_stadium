import { Test, TestingModule } from '@nestjs/testing';
import { PaymentForWalletService } from './payment_for_wallet.service';

describe('PaymentForWalletService', () => {
  let service: PaymentForWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentForWalletService],
    }).compile();

    service = module.get<PaymentForWalletService>(PaymentForWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
