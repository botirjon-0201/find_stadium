import { Test, TestingModule } from '@nestjs/testing';
import { UserWalletService } from './user_wallet.service';

describe('UserWalletService', () => {
  let service: UserWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserWalletService],
    }).compile();

    service = module.get<UserWalletService>(UserWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
