<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CryptoPrice } from 'components/model';
import axios from 'axios';

const prices = ref<CryptoPrice[]>([]);

onMounted(async () => {
  const response = await axios.get('/api');
  prices.value = response.data;
});

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
