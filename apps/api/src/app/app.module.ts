import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PriceFetchCronService } from '../cron/price-fetch-cron/price-fetch-cron.service';
import { PrismaService } from '../prisma.service';
import { CryptoTickerFetcherModule } from '../crypto-ticker-fetcher/crypto-ticker-fetcher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CacheModule.register(),
    ScheduleModule.forRoot(),
    CryptoTickerFetcherModule,
  ],
  controllers: [AppController],
  providers: [AppService, PriceFetchCronService, PrismaService],
})
export class AppModule {}
