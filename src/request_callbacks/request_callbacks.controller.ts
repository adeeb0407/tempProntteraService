import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequestCallbacksService } from './request_callbacks.service';
import {
  CreateRequestCallbackDto,
  GetIdParams,
} from './dto/create-request_callback.dto';
import { UpdateRequestCallbackDto } from './dto/update-request_callback.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RequestCallbackResponseDto } from './dto/response/request_callbacks.response.dto';

@ApiTags('Request Callbacks') // Add Swagger tag for grouping
@Controller('request-callbacks')
export class RequestCallbacksController {
  constructor(
    private readonly requestCallbacksService: RequestCallbacksService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new request callback' })
  @ApiBody({ type: CreateRequestCallbackDto })
  @ApiResponse({
    status: 201,
    description: 'The request callback has been successfully created.',
    type: RequestCallbackResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input.',
  })
  async create(
    @Body() createRequestCallbackDto: CreateRequestCallbackDto,
  ): Promise<RequestCallbackResponseDto> {
    return this.requestCallbacksService.create(createRequestCallbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all request callbacks' })
  @ApiResponse({
    status: 200,
    description: 'List of all request callbacks.',
    type: [RequestCallbackResponseDto],
  })
  async findAll() {
    return this.requestCallbacksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific request callback by ID' })
  @ApiResponse({
    status: 200,
    description: 'The request callback has been successfully retrieved.',
    type: RequestCallbackResponseDto,
  })
  async findOne(@Param() params: GetIdParams) {
    return this.requestCallbacksService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific request callback by ID' })
  @ApiResponse({
    status: 204,
    description: 'The request callback has been successfully updated.',
    type: RequestCallbackResponseDto,
  })
  async update(
    @Param() params: GetIdParams,
    @Body() updateRequestCallbackDto: UpdateRequestCallbackDto,
  ) {
    return this.requestCallbacksService.update(
      params.id,
      updateRequestCallbackDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a specific request callback by ID' })
  @ApiResponse({
    status: 204,
    description: 'The request callback has been successfully removed.',
  })
  async remove(@Param() params: GetIdParams) {
    return this.requestCallbacksService.remove(params.id);
  }
}
