<template>
  <div class="q-pa-lg text-center">
    <div class="flex-row gap-4 justify-center">
      <div class="q-mb-lg q-mx-auto" style="max-width: 300px; width: 100%">
        <q-select
          v-model="selectedCoin"
          :options="[
            { label: 'TON', value: 'the-open-network' },
            { label: 'Bitcoin', value: 'bitcoin' },
            { label: 'Ethereum', value: 'ethereum' },
            { label: 'Litecoin', value: 'litecoin' },
          ]"
          label="Select a coin"
          filled
          map-options
          emit-value
        />
      </div>
      <p v-if="loading">loading crypto prices...</p>
      <p v-else-if="!loading && !error && tickers.length === 0">
        No data available
      </p>
      <p v-else-if="error" class="text-red-8">{{ error }}</p>
      <div v-else class="q-gutter-md row justify-center">
        <crypto-price-component
          class="text-white col-xs-12 col-sm-5 col-md-4 col-lg-3"
          style="max-width: 250px; background: radial-gradient(circle, #2c8ee1 0%, #014a88 100%)"
          v-for="ticker in tickers"
          :key="ticker.pair"
          :ticker="ticker"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useCryptoPrices } from 'src/composables/useCryptoPrices';
import CryptoPriceComponent from 'components/CryptoPriceComponent.vue';

const selectedCoin = ref('the-open-network'); // default

const { loading, error, tickers, fetchPrices } = useCryptoPrices();

watch(selectedCoin, async (newCoin) => {
  await fetchPrices(newCoin);
});

onMounted(() => fetchPrices(selectedCoin.value));
</script>
