import { Test, TestingModule } from '@nestjs/testing';
import { ComfortStadiumController } from './comfort_stadium.controller';
import { ComfortStadiumService } from './comfort_stadium.service';

describe('ComfortStadiumController', () => {
  let controller: ComfortStadiumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComfortStadiumController],
      providers: [ComfortStadiumService],
    }).compile();

    controller = module.get<ComfortStadiumController>(ComfortStadiumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
