import { ref } from 'vue';
import axios from 'axios';
import type { CryptoTicker } from 'components/model';

export function useCryptoPrices() {
  const tickers = ref<CryptoTicker[]>([]);
  const loading = ref(false);
  const error = ref('');

  const fetchPrices = async () => {
    loading.value = true;
    error.value = '';

    try {
      const coinId = 'the-open-network';
      const response = await axios.get('/api/tickers/' + coinId);
      tickers.value = response.data;
    } catch (err) {
      error.value = 'Error fetching crypto prices';
      console.error(err);
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
