<script setup lang="ts">
import { ref } from 'vue';
import type { CryptoPrice } from 'components/model';

const prices = ref<CryptoPrice[]>([
  {
    pair: 'TON/USDT',
    price: 1234,
    source: 'Coingecko',
    timestamp: Date.now(),
  },
  {
    pair: 'TON/USDT',
    price: 1234,
    source: 'Coingecko',
    timestamp: Date.now(),
  },
]);

</script>

<template>
  <div class="flex-col" style="height: 100vh; width: 50vw">
  <h4>Current Crypto Prices</h4>
  <q-list>
    <q-item v-for="price in prices" :key="price.pair">
      <q-item-section>
        <q-item-label>{{ price.pair }}</q-item-label>
        <q-item-label caption>{{ price.source }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ price.price }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  </div>
</template>

<style scoped></style>
