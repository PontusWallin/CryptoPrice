import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  firstValueFrom,
} from 'rxjs';
import { PrismaService } from '../../prisma.service';
import { CryptoTickerFetcherService } from '../../crypto-ticker-fetcher/crypto-ticker-fetcher.service';

@Injectable()
export class PriceFetchCronService {

  constructor(
    private cryptoTickerFetcherService: CryptoTickerFetcherService,
    private prisma: PrismaService
  ) {}

  // We're fetching a small number of coins using a simple loop for now. In the future when we need to fetch more coins
  // we will split this into task queues and use a more sophisticated approach, to avoid hitting the rate limit
  @Cron('* */20 * * * *')
  async preFetchCryptoTickers() {
    const coinIds = [
      'bitcoin',
      'ethereum',
      'the-open-network',
      'litecoin',
    ]

    const allFetchedTickers = [];
    for (const coinId of coinIds) {
      const currentTicker = await firstValueFrom(
        await this.cryptoTickerFetcherService.fetchCryptoTicker(coinId)
      );
      allFetchedTickers.push(...currentTicker);
    }

    // we have the tickers, and the cryptoTickerFetcherService service has already cached them
    // we are now ready to save them to the database

    // change timestamp to date in UTC
    allFetchedTickers.forEach((ticker) => {
      ticker.timestamp = new Date(ticker.timestamp);
    });

    // ... and save them to the database
   await  this.prisma.cryptoTicker.createMany({
      data: allFetchedTickers
    });
  }
}
