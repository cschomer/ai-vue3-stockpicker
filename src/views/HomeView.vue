<script setup lang="ts">
import StockPicker from '@/components/StockPicker.vue'
</script>

<template>
  <div id="homeview">
    <StockPicker />
  </div>
</template>

<style scoped>
#homeview {
  display: grid;
  width: auto;
  grid-template-columns: auto auto;
  column-gap: 10px;
}
</style>
