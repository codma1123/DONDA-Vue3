<template>
  <div class="DetailLayout">
    <StockCloseChart v-if="!stockGraphAll.loading" :chartData="stockGraphAll.data" />
    <StockClose />
  </div>
</template>

<script setup lang="ts">

  import StockClose from '../../components/detail/StockClose.vue';
  import StockCloseChart from '../../components/detail/close/StockCloseChart.vue';
import { useStockStore } from '../../store/stock';

  const { stockGraphAll } = useStockStore()

</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}


</style>