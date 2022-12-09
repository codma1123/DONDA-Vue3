<template>  
  <v-card
    class="CardLayout IndicatorCardLayout"
    color="cardlayout"
    v-if="!loading"
  >
    <v-card-title>      

    </v-card-title>
    <v-card-text>
      <StockIndicatorChart />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue'
  import StockIndicatorChart from './StockIndicatorChart.vue';

  const { indicator } = useStockStore()
  const loading = computed(() => indicator.loading)
  
</script>

<style scoped>
.IndicatorCardLayout {
  height: 300px;
}
</style>