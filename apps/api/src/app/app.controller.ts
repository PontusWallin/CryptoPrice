import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('tickers/:coinId')
  getTicketForCoin(@Param('coinId') coinId: string) {
    return this.appService.getTickersForCoin(coinId);
  }
}
