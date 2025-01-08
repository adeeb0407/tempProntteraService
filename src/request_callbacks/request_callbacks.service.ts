import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestCallbackDto } from './dto/create-request_callback.dto';
import { UpdateRequestCallbackDto } from './dto/update-request_callback.dto';
import { RequestCallback } from './entities/request_callback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestCallbackResponseDto } from './dto/response/request_callbacks.response.dto';

@Injectable()
export class RequestCallbacksService {
  private requestCallbacksRepository: Repository<RequestCallback>;
  private readonly logger = new Logger(RequestCallbacksService.name);
  constructor(
    @InjectRepository(RequestCallback)
    requestCallbacksRepository: Repository<RequestCallback>,
  ) {
    this.requestCallbacksRepository = requestCallbacksRepository;
  }
  async create(
    createRequestCallbackDto: CreateRequestCallbackDto,
  ): Promise<RequestCallbackResponseDto> {
    try {
      const newRequestCallback = this.requestCallbacksRepository.create(
        createRequestCallbackDto,
      );
      this.logger.log('Creating new request callback');

      // Save the new record and return the saved entity
      const savedRequestCallback =
        await this.requestCallbacksRepository.save(newRequestCallback);

      this.logger.log(
        'New request callback created successfully:',
        savedRequestCallback,
      );

      return savedRequestCallback;
    } catch (error) {
      this.logger.error('Error creating request callback:', error.stack);
      throw new InternalServerErrorException(
        'Failed to create request callback',
      );
    }
  }

  async findAll(): Promise<RequestCallback[]> {
    return this.requestCallbacksRepository.find(); // Returns all request callbacks
  }

  // Find one request callback by ID
  async findOne(id: string): Promise<RequestCallback> {
    const requestCallback = await this.requestCallbacksRepository.findOne({
      where: { id },
    });
    if (!requestCallback) {
      throw new Error(`Request callback with ID ${id} not found`);
    }
    return requestCallback;
  }

  // Update a request callback by ID
  async update(
    id: string,
    updateRequestCallbackDto: UpdateRequestCallbackDto,
  ): Promise<RequestCallback> {
    // Check if the request callback exists
    const requestCallback = await this.requestCallbacksRepository.findOne({
      where: { id },
    });

    if (!requestCallback) {
      this.logger.error(`Request callback with ID ${id} not found`);
      throw new NotFoundException(`Request callback with ID ${id} not found`);
    }

    // Update the request callback with the new data
    const updatedRequestCallback = Object.assign(
      requestCallback,
      updateRequestCallbackDto,
    );

    // Save the updated entity
    try {
      const result = await this.requestCallbacksRepository.save(
        updatedRequestCallback,
      );
      this.logger.log(`Successfully updated request callback with ID ${id}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to update request callback with ID ${id}: ${error.message}`,
      );
      throw new Error('Failed to update the request callback.');
    }
  }

  // Remove a request callback by ID
  async remove(id: string): Promise<void> {
    // Try to delete the request callback by ID
    const result = await this.requestCallbacksRepository.delete({ id });

    if (result.affected === 0) {
      this.logger.error(
        `Request callback with ID ${id} not found for deletion`,
      );
      throw new NotFoundException(`Request callback with ID ${id} not found`);
    }

    // Log the successful deletion
    this.logger.log(`Successfully deleted request callback with ID ${id}`);
  }
}
