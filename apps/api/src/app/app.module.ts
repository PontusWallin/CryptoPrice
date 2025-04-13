import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PriceFetchCronService } from '../cron/price-fetch-cron/price-fetch-cron.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    CacheModule.register(),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, PriceFetchCronService],
})
export class AppModule {}
