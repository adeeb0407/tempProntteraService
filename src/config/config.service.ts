import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('SUPABASE_DB_URL');
  }

  get isSynchronize(): boolean {
    return this.configService.get<boolean>('TYPEORM_SYNC', true); // Default to `true`
  }
}
