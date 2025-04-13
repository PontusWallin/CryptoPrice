import { of } from 'rxjs';

export const mockCacheManager = {
  get: jest.fn(() => Promise.resolve([{ pair: 'BTC/USDT', price: 1234, source: 'Cache', timestamp: 1744547338433 }])),
  set: jest.fn(),
};

export const mockTickerFetcher = {
  fetchCryptoTicker: jest.fn(() => Promise.resolve(
    of([{ pair: 'BTC/USDT', price: 1234, source: 'TickerFetcher', timestamp: 1744547338433 }]))
  ),
};

export const mockPrismaService = {
  cryptoTicker: {
    findMany: jest.fn(() => Promise.resolve([{ pair: 'BTC/USDT', price: 1234, source: 'Database', timestamp: 1744547338433 }])),
  },
};

export const mockConfigService = {
  get: jest.fn(() => 5 * 60 * 1000),
};
