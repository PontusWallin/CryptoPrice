import { Inject, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CACHE_MANAGER} from "@nestjs/cache-manager";
import type { Cache } from 'cache-manager'
import { PrismaService } from '../prisma.service';
import { CryptoTickerFetcherService } from '../crypto-ticker-fetcher/crypto-ticker-fetcher.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    private cryptoTickerFetcherService: CryptoTickerFetcherService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async getTickersForCoin(coinId: string): Promise<Observable<any>> {
    const cacheKey = `${coinId}-ticker-data`;
    const cachedTickerData = await this.cacheManager.get(cacheKey);
    if (cachedTickerData) {
      return of(cachedTickerData);
    }

    // return from db if not cached for some reason
    const tickersFromDb = await this.prisma.cryptoTicker.findMany({
      where: {
        pair: {
          contains: coinId
        },
        timestamp: {
          gt: new Date(Date.now() - this.configService.get<number>('TTL', 30000)) // less than ttl minutes old
        }
      }
    });

    if(tickersFromDb.length > 0) {
      return of(tickersFromDb);
    }

    // oops, not found in db either, we have to fetch directly from CoinGecko
    return await this.cryptoTickerFetcherService.fetchCryptoTicker(coinId);
  }
}
