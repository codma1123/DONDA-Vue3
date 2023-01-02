<template>
  <div class="DetailLayout" v-if="loading">
    <StockTitle /> 
  </div>
</template>

<script setup lang="ts">
  import StockTitle from '@/components/detail/StockTitle.vue';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'

  const { stock, indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()

  const loading = computed(() => 
    !stock.loading &&
    !indicator.loading &&
    !indicatorSector.loading &&
    !indicatorDaily.loading &&
    !indicatorSectorDaily.loading 
  )

</script>

<style scoped>

</style>