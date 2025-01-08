import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, Length, IsUUID } from 'class-validator';

export class CreateRequestCallbackDto {
  @ApiProperty({
    description:
      'The country code for the phone number, including the "+" sign.',
    example: '+91',
  })
  @IsString()
  @Matches(/^\+\d{1,3}$/, {
    message: 'Country code must start with a "+" followed by 1 to 3 digits.',
  })
  countryCode: string;

  @ApiProperty({
    description: 'The phone number associated with the request callback.',
    example: '1234567890',
  })
  @IsString()
  @Length(10, 15, { message: 'Phone number must be between 10 and 15 digits.' })
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits.' })
  phoneNumber: string;
}

export class GetIdParams {
  @ApiProperty({
    description: 'The unique identifier for the request callback (UUID).',
    example: 'a3c0f85f-5f9a-4c2f-b4e5-2e8f320bf631',
  })
  @IsUUID('4', { message: 'The id must be a valid UUID.' })
  id: string;
}
