import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): any[] {
    return [
      {
        pair: 'TON/USDT',
        price: 1234,
        source: 'Coingecko',
        timestamp: Date.now(),
      },
      {
        pair: 'USDT/TON',
        price: 4321,
        source: 'Coingecko',
        timestamp: Date.now(),
      },
    ];
  }
}
