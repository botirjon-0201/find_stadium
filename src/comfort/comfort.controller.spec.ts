import { Test, TestingModule } from '@nestjs/testing';
import { ComfortController } from './comfort.controller';
import { ComfortService } from './comfort.service';

describe('ComfortController', () => {
  let controller: ComfortController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComfortController],
      providers: [ComfortService],
    }).compile();

    controller = module.get<ComfortController>(ComfortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
