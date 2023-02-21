import { Test, TestingModule } from '@nestjs/testing';
import { UserCardsController } from './user_cards.controller';
import { UserCardsService } from './user_cards.service';

describe('UserCardsController', () => {
  let controller: UserCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCardsController],
      providers: [UserCardsService],
    }).compile();

    controller = module.get<UserCardsController>(UserCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
