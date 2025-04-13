import { Module } from '@nestjs/common';
import { CryptoTickerFetcherService } from './crypto-ticker-fetcher.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [CryptoTickerFetcherService],
  exports: [CryptoTickerFetcherService],
})
export class CryptoTickerFetcherModule {}
