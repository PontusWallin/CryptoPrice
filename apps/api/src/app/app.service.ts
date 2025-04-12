import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { CACHE_MANAGER} from "@nestjs/cache-manager";
import type { Cache } from 'cache-manager'

const BASE_URL = 'https://api.coingecko.com/api/v3/';

@Injectable()
export class AppService {

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  private coingeckoURL = BASE_URL + 'coins/the-open-network/tickers';

  async getTONTickers(): Promise<Observable<any>> {
    const cachedTickerData = await this.cacheManager.get('ton-ticker-data');

    if (cachedTickerData) {
      return of(cachedTickerData);
    }

    return this.httpService.get(this.coingeckoURL).pipe(
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
        return from(this.cacheManager.set('ton-ticker-data', tickers, 5*60*1000)).pipe(
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
