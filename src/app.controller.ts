import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('example')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @ApiOperation({ summary: 'Get all examples', description: 'Retrieve all example items.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
