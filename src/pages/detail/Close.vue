<template>
  <div class="DetailLayout">    
    <StockTitle />
    <v-card-subtitle> 의 주가를 살펴보세요.</v-card-subtitle>
    <!-- <StockClose :label="'ㅎㅎ;'"/> -->
    <v-card 
      class="CardLayout" 
      color="cardlayout"
    >      
      <v-card-text>
        <div class="mb-5"> 종가 </div>
        <span v-font-size="45">
          {{ priceFormatter.format(stockData.close) }}
        </span>        
        <span v-font-size="17">
          ({{ computedChanges }})
        </span>
        <div class="mt-3 mb-3"> 고가</div>
      </v-card-text>
    </v-card>
    <StockCloseChart v-if="loading" :chartData="chartData" />
  </div>
</template>

<script setup lang="ts">

  import { computed } from 'vue'
  import StockClose from '../../components/detail/StockClose.vue';
  import StockCloseChart from '../../components/detail/close/StockCloseChart.vue';
  import { useStockStore } from '../../store/stock';
  import { priceFormatter } from '../../mixins/tools';
  import StockTitle from '../../components/detail/StockTitle.vue'
  const { stockGraphAll, stock } = useStockStore()

  const chartData = computed(() => stockGraphAll.data)
  const loading = computed<boolean>(() => !stock.loading && !stockGraphAll.loading)
  const stockData = computed(() => stock.data)
  const computedChanges = computed<string>(() => {
    const change = stock.data.changes
    return change > 0 ? '+' + change.toLocaleString() : '' + change.toLocaleString()
  } )

  // const label = computed<string>(() => {
  //   const stockGraphAll 
  // })

</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}


</style>