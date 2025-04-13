import { Inject, Injectable } from '@nestjs/common';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER} from "@nestjs/cache-manager";
import { ConfigService } from '@nestjs/config';

const BASE_URL = 'https://api.coingecko.com/api/v3/';

@Injectable()
export class CryptoTickerFetcherService {

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  public async fetchCryptoTicker(coinId: string): Promise<Observable<any>> {
    const cryptoTickerUrl = BASE_URL + `coins/${coinId}/tickers`;
    return this.httpService.get(cryptoTickerUrl).pipe(
      map((response: any) => {
        const tickers = response.data.tickers;

        return tickers
          .filter((t: any) => t.target === 'USDT' && t.market.identifier === 'binance')
          .flatMap((t: any) => {
            const timestamp = Date.now();

            const normal = {
              pair: `${t.base}/${t.target}`,
              price: t.last,
              source: t.market.name,
              timestamp,
            };

            const reversed = {
              pair: `${t.target}/${t.base}`,
              price: 1 / t.last,
              source: t.market.name,
              timestamp,
            };

            return [normal, reversed];
          });
      }),
      mergeMap((tickers) => {
        if (tickers.length < 1) {
          return of([]);
        }

        // cache the tickers and keep them for the configured TTL
        const cacheKey = `${coinId}-ticker-data`;
        return from(this.cacheManager.set(cacheKey, tickers, this.configService.get<number>('TTL', 30000))).pipe(
          map(() => tickers) // Pass tickers downstream after caching is done
        );
      }),
      catchError((err) => {
        console.error('Error fetching tickers from CoinGecko - ', err.message);
        return of([]);
      })
    );
  }


}
