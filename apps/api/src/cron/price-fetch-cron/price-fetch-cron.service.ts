import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import {
  catchError,
  firstValueFrom,
  from,
  map,
  mergeMap,
  Observable,
  of,
} from 'rxjs';
import { PrismaService } from '../../prisma.service';

const BASE_URL = 'https://api.coingecko.com/api/v3/';

@Injectable()
export class PriceFetchCronService {

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService
  ) {}

  // We're fetching a small number of coins using a simple loop for now. In the future when we need to fetch more coins
  // we will split this into task queues and use a more sophisticated approach, to avoid hitting the rate limit
  // @Cron('0 */20 * * * *') // Every 20 minutes at second 0
  @Cron('10 * * * * *') // Every 10 seconds
  async preFetchCryptoTickers() {
    const coinIds = [
      'bitcoin',
      'ethereum',
      'the-open-network',
      'litecoin',
    ]

    const allFetchedTickers = [];
    for (const coinId of coinIds) {
      const currentTicker = await firstValueFrom(await this.fetchSingleCryptoTicker(coinId));
      allFetchedTickers.push(...currentTicker);
    }

    // we have the tickers, and the fetchSingleCryptoTicker function has already cached them
    // we are now ready to save them to the database
    // change timestamp to date in UTC
    allFetchedTickers.forEach((ticker) => {
      ticker.timestamp = new Date(ticker.timestamp);
    });

   await  this.prisma.cryptoTicker.createMany({
      data: allFetchedTickers
    });


  }

  private async fetchSingleCryptoTicker(coinId: string): Promise<Observable<any>> {
    // check the cache first
    const cacheKey = `${coinId}-ticker-data`;
    const cachedTickerData = await this.cacheManager.get(cacheKey);
    if (cachedTickerData) {
      return of(cachedTickerData);
    }

    // if cache miss, fetch from coingecko
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

        // cache the tickers for 5 minutes
        return from(this.cacheManager.set(cacheKey, tickers, 5 * 60 * 1000)).pipe(
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
