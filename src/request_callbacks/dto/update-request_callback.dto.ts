import { PartialType } from '@nestjs/swagger';
import { CreateRequestCallbackDto } from './create-request_callback.dto';

export class UpdateRequestCallbackDto extends PartialType(CreateRequestCallbackDto) {}
