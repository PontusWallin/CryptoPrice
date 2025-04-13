import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom} from 'rxjs';
import { CryptoTickerFetcherService } from '../crypto-ticker-fetcher/crypto-ticker-fetcher.service';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { mockCacheManager, mockConfigService, mockPrismaService, mockTickerFetcher } from '../../test/utils/__mocks__/mocks';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
        { provide: CryptoTickerFetcherService, useValue: mockTickerFetcher },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should be defined"', () => {
      expect(service).toBeDefined();
    });

    it('returns cached tickers when available', async () => {
      const result = await firstValueFrom(
        await service.getTickersForCoin('the-open-network')
      );
      expect(result).toEqual([{ pair: 'BTC/USDT', price: 1234, source: 'Cache', timestamp: 1744547338433 }]);
    });

    it('return ticker from database when not cached', async () => {
      mockCacheManager.get.mockImplementationOnce(() => Promise.resolve(null));
      const result = await firstValueFrom(
        await service.getTickersForCoin('the-open-network')
      );
      expect(result).toEqual([{ pair: 'BTC/USDT', price: 1234, source: 'Database', timestamp: 1744547338433 }]);
    })

    it('returns tickers from ticker fetcher when not in cache or database ', async () => {
      mockCacheManager.get.mockImplementationOnce(() => Promise.resolve(null));
      mockPrismaService.cryptoTicker.findMany.mockImplementationOnce(() => Promise.resolve([]));
      const result = await firstValueFrom(
        await service.getTickersForCoin('the-open-network')
      );
      expect(result).toEqual([{ pair: 'BTC/USDT', price: 1234, source: 'TickerFetcher', timestamp: 1744547338433 }]);
    });
  });
});
