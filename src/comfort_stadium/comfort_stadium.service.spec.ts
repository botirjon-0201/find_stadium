import { Test, TestingModule } from '@nestjs/testing';
import { ComfortStadiumService } from './comfort_stadium.service';

describe('ComfortStadiumService', () => {
  let service: ComfortStadiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComfortStadiumService],
    }).compile();

    service = module.get<ComfortStadiumService>(ComfortStadiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
