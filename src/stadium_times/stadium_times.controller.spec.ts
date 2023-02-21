import { Test, TestingModule } from '@nestjs/testing';
import { StadiumTimesController } from './stadium_times.controller';
import { StadiumTimesService } from './stadium_times.service';

describe('StadiumTimesController', () => {
  let controller: StadiumTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadiumTimesController],
      providers: [StadiumTimesService],
    }).compile();

    controller = module.get<StadiumTimesController>(StadiumTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
