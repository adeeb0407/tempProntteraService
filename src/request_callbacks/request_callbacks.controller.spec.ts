import { Test, TestingModule } from '@nestjs/testing';
import { RequestCallbacksController } from './request_callbacks.controller';
import { RequestCallbacksService } from './request_callbacks.service';

describe('RequestCallbacksController', () => {
  let controller: RequestCallbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestCallbacksController],
      providers: [RequestCallbacksService],
    }).compile();

    controller = module.get<RequestCallbacksController>(RequestCallbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
