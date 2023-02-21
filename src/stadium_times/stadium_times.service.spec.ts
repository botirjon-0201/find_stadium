import { Test, TestingModule } from '@nestjs/testing';
import { StadiumTimesService } from './stadium_times.service';

describe('StadiumTimesService', () => {
  let service: StadiumTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadiumTimesService],
    }).compile();

    service = module.get<StadiumTimesService>(StadiumTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
