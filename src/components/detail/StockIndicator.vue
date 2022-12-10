<template>  
  <v-card
    class="CardLayout IndicatorCardLayout"
    color="cardlayout"    
  >
    <div v-if="!indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading">
      <StockIndicatorChart />      
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue'
  import StockIndicatorChart from './StockIndicatorChart.vue';

  const { indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const loading = computed<boolean>(() => !indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading)
  
</script>

<style scoped>
.IndicatorCardLayout {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>