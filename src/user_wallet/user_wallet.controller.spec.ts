import { Test, TestingModule } from '@nestjs/testing';
import { UserWalletController } from './user_wallet.controller';
import { UserWalletService } from './user_wallet.service';

describe('UserWalletController', () => {
  let controller: UserWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWalletController],
      providers: [UserWalletService],
    }).compile();

    controller = module.get<UserWalletController>(UserWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
