<template>
  <div class="DetailLayout">    

    <StockTitle />

    <v-divider />
    

      <!-- <v-card-item :title="stockData.date" /> -->

    <v-card-subtitle class="mt-3"> 
      종가 Close
    </v-card-subtitle>
    <v-card-text class="text-center">
      <span v-font-size="45">
        {{ priceFormatter.format(stockData.close) }}
      </span>        
      <span v-font-size="17" class="ml-2">
        {{ computedChanges }}
      </span>
      <span>
        ({{ computedChangeRatio }})
      </span>
    </v-card-text>

    <v-divider />

    <div class="d-flex flex-wrap ">
      <div>
        <v-card-subtitle class="mt-3"> 
          고가
        </v-card-subtitle>    
        <v-card-text class="text-center">
          <span v-font-size="35">
            {{ priceFormatter.format(stockData.high) }}
          </span>        
        </v-card-text>
      </div>
      <div>
        <v-card-subtitle class="mt-3"> 저가 </v-card-subtitle>    
        <v-card-text class="text-center">
          <span v-font-size="35">
            {{ priceFormatter.format(stockData.low) }}
          </span>        
        </v-card-text>
      </div>
      <div>
        <v-card-subtitle class="mt-3"> 시가 </v-card-subtitle>    
        <v-card-text class="text-center">
          <span v-font-size="35">
            {{ priceFormatter.format(stockData.open) }}
          </span>        
        </v-card-text>
      </div>
      <div>
        <v-card-subtitle class="mt-3"> 거래량 </v-card-subtitle>    
        <v-card-text class="text-center">
          <span v-font-size="35">
            {{ stockData.volume.toLocaleString() }}
          </span>        
        </v-card-text>
      </div>
    </div>

    <v-divider />



    <v-divider />

    <StockCloseChart v-if="loading" :chartData="chartData" />
  </div>
</template>

<script setup lang="ts">

  import { computed } from 'vue'  
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
    return change > 0 ? '+₩' + change.toLocaleString() : '₩' + change.toLocaleString()
  })

  const computedChangeRatio = computed<string>(() => {
    const changes_ratio = stock.data.changes_ratio as number
    return changes_ratio > 0 ? '+' + changes_ratio.toLocaleString() : '' + changes_ratio.toLocaleString()
  })
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}


</style>