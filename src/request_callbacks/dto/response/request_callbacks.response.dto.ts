import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RequestCallbackResponseDto {
  @ApiProperty({
    description: 'The unique identifier for the request callback',
    example: 'f7bb3b7f-9077-4fa1-9f16-c918e98957f0',
  })
  id: string;

  @ApiProperty({
    description: 'The timestamp when the request callback was created',
    example: '2025-01-07T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The timestamp when the request callback was last updated',
    example: '2025-01-07T14:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The country code associated with the phone number',
    example: '+91',
    required: false,
  })
  @IsOptional()
  countryCode?: string;

  @ApiProperty({
    description: 'The phone number associated with the request callback',
    example: '1234567890',
  })
  phoneNumber: string;
}
