import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { useCryptoPrices } from '../../../src/composables/useCryptoPrices';


vi.mock('axios');

describe('useCryptoPrices composable', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches prices and sets tickers', async () => {
    const mockData = [{ pair: 'TON/USDT', price: 2.94, source: 'Binance', timestamp: Date.now() }];
    (axios.get as any).mockResolvedValue({ data: mockData });

    const { loading, error, tickers, fetchPrices } = useCryptoPrices();

    expect(loading.value).toBe(false);
    await fetchPrices('the-open-network');

    expect(loading.value).toBe(false);
    expect(tickers.value).toEqual(mockData);
    expect(error.value).toBe('');
  });

  it('sets error on failure', async () => {
    (axios.get as any).mockRejectedValue(new Error('Network Error'));

    const { error, fetchPrices } = useCryptoPrices();

    await fetchPrices('invalid-coin');

    expect(error.value).toBe('Error fetching crypto prices, please try again later');
  });
});
