import { Module } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';

@Module({
  controllers: [ComfortController],
  providers: [ComfortService]
})
export class ComfortModule {}
