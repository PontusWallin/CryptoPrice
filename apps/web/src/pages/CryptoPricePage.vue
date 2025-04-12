<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-mb-lg" style="max-width: 300px; width: 100%">
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
    <div class="q-gutter-md row justify-center">
      <crypto-price-component
        class="bg-yellow-3"
        v-for="ticker in tickers"
        :key="ticker.pair"
        :ticker="ticker"
      />
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="loading" class="text-red-500">loading...</p>
  </q-page>
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
