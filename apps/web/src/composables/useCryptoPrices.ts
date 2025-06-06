import { ref } from 'vue';
import axios from 'axios';
import type { CryptoTicker } from 'components/model';

export function useCryptoPrices() {
  const tickers = ref<CryptoTicker[]>([]);
  const loading = ref(false);
  const error = ref('');

  const fetchPrices = async (coinId: string) => {
    loading.value = true;
    error.value = '';

    try {
      const response = await axios.get('/api/tickers/' + coinId);
      tickers.value = response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      error.value = 'Error fetching crypto prices, please try again later';
    } finally {
      loading.value = false;
    }
  };

  return {
    tickers,
    loading,
    error,
    fetchPrices,
  };
}
