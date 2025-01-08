import { Module } from '@nestjs/common';
import { RequestCallbacksService } from './request_callbacks.service';
import { RequestCallbacksController } from './request_callbacks.controller';
import { RequestCallback } from './entities/request_callback.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RequestCallback])],
  controllers: [RequestCallbacksController],
  providers: [RequestCallbacksService],
})
export class RequestCallbacksModule {}
