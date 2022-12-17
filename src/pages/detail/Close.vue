<template>
  <div class="DetailLayout">    

    <!-- Title -->
    <StockTitle />
      
    <!-- Close -->
    <StockCloses :stockData="stockData" />

    <!-- CloseChart -->
    <StockCloseChart :chartData="chartData" />

    <!-- Compare -->
    <StockCloseCompare :stockData="stockData"/>
    
  </div>
</template>

<script setup lang="ts">

  import { computed, onMounted } from 'vue'  
  import { useStockStore } from '../../store/stock';

  import StockCloseChart from '../../components/detail/close/StockCloseChart.vue';
  import StockTitle from '../../components/detail/StockTitle.vue'
  import StockCloses from '../../components/detail/close/StockCloses.vue'
  import StockCloseCompare from '../../components/detail/close/StockCloseCompare.vue'
    
  const { stockGraphAll, stock } = useStockStore()
  
  const chartData = computed(() => stockGraphAll.data)
  const stockData = computed(() => stock.data)
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

</style>