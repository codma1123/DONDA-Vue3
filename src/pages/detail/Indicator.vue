<template>
  <div class="DetailLayout" v-if="loading">

    <StockTitle /> 

    <IndicatorOverview />

    <IndicatorInfos />
  </div>
</template>

<script setup lang="ts">
  import StockTitle from '@/components/detail/StockTitle.vue';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import IndicatorInfos from '@/components/detail/indicator/IndicatorInfos.vue'
  import IndicatorOverview from '@/components/detail/indicator/IndicatorOverview.vue'

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