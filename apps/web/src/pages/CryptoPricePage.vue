<template>
  <q-page class="row items-center justify-evenly">
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="loading" class="text-red-500">loading...</p>
    <crypto-price-component
      class="bg-yellow-3"
      v-for="ticker in tickers"
      :key="ticker.pair"
      :ticker="ticker"
    />
  </q-page>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useCryptoPrices } from 'src/composables/useCryptoPrices';
import CryptoPriceComponent from 'components/CryptoPriceComponent.vue';
const { loading, error, tickers, fetchPrices } = useCryptoPrices()

onMounted(fetchPrices);
</script>
