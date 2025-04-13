<script setup lang="ts">
import type { CryptoTicker } from 'components/model';

defineProps<{
  ticker: CryptoTicker
}>();

</script>

<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">{{ ticker.pair }}</div>
      <div class="text-h6">Price: {{ ticker.price.toFixed(5) }}</div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle1">Source: {{ ticker.source }}</div>
      <div class="text-subtitle1">Updated: {{ new Date(ticker.timestamp).toTimeString() }}</div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
