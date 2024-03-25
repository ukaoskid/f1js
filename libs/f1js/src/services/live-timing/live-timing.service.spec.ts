import { Test, TestingModule } from '@nestjs/testing';
import { LiveTimingService } from './live-timing.service';

describe('LiveTimingService', () => {
  let service: LiveTimingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveTimingService],
    }).compile();

    service = module.get<LiveTimingService>(LiveTimingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
