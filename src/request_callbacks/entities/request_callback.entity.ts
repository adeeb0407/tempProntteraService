import { Entity, Column } from 'typeorm';
import { IsString, Matches, IsOptional } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('request_callback')
export class RequestCallback extends BaseEntity {
  @Column({ name: 'country_code', nullable: true })
  @IsString()
  @Matches(/^\+(\d{1,3})$/, {
    message: 'Country code must start with a "+" followed by 1 to 3 digits.',
  })
  @IsOptional() // Make it optional if it's nullable in the DB
  countryCode: string;

  @Column({ name: 'phone_number' })
  @IsString()
  @Matches(/^\d{10,15}$/, {
    message:
      'Phone number must be between 10 and 15 digits and contain only numbers.',
  })
  phoneNumber: string;
}
