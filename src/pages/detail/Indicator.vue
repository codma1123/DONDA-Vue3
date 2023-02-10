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
  import { computed, onMounted } from 'vue'
  import IndicatorInfos from '@/components/detail/indicator/IndicatorInfos.vue'
  import IndicatorOverview from '@/components/detail/indicator/IndicatorOverview.vue'
  import { useAppStore } from '@/store/app';

  const { stock, indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const { scrollReset } = useAppStore()

  const loading = computed(() => 
    !stock.loading &&
    !indicator.loading &&
    !indicatorSector.loading &&
    !indicatorDaily.loading &&
    !indicatorSectorDaily.loading 
  )

  onMounted(() => scrollReset())

</script>
