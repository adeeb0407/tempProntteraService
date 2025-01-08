import { Test, TestingModule } from '@nestjs/testing';
import { RequestCallbacksService } from './request_callbacks.service';

describe('RequestCallbacksService', () => {
  let service: RequestCallbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestCallbacksService],
    }).compile();

    service = module.get<RequestCallbacksService>(RequestCallbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
