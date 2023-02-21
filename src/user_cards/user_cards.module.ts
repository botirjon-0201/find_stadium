import { Module } from '@nestjs/common';
import { UserCardsService } from './user_cards.service';
import { UserCardsController } from './user_cards.controller';

@Module({
  controllers: [UserCardsController],
  providers: [UserCardsService]
})
export class UserCardsModule {}
