import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestCallbacksModule } from './request_callbacks/request_callbacks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('SUPABASE_DB_URL'),
        autoLoadEntities: true, // Automatically load entities
        synchronize: true, // Use only in development
      }),
    }),
    RequestCallbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
