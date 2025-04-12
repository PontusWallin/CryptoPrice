import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';

const BASE_URL = 'https://api.coingecko.com/api/v3/';

@Injectable()
export class AppService {

  constructor(private readonly httpService: HttpService) {}

  private coingeckoURL = BASE_URL + 'coins/the-open-network/tickers';

  async getData(): Promise<Observable<any>> {

    return this.httpService.get(this.coingeckoURL).pipe(
      map((response: any) => {
        const tickers = response.data.tickers;

        return tickers
          .filter((t: any) => t.target === 'USDT' && t.market.identifier === 'binance')
          .flatMap((t: any) => {
            const timestamp = Date.now();

            const normal = {
              pair: `${t.base}/${t.target}`,   // TON/USDT
              price: t.last,
              source: t.market.name,
              timestamp,
            };

            const reversed = {
              pair: `${t.target}/${t.base}`,   // USDT/TON
              price: 1 / t.last,
              source: t.market.name,
              timestamp,
            };

            return [normal, reversed];
          });
      })
    );
  }
}
