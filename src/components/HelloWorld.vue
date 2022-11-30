<template>
  <div>
    {{ stockStore.test }}
  </div>
</template>

<script setup lang="ts">
import { useStockStore } from '../store/stock';

const stockStore = useStockStore()


</script>

<style scoped>

</style>