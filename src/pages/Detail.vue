<template>
  <div class="DetailLayout">
    <ProgressCircular v-if="stockEvaluation.loading" absolute />    
    <StockInfo />
    <StockClose />



      <!-- <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="2"
        link    
      >
        <EvaluationChart 
          v-if="!_.isEmpty(evaluationChartData)"
          :chartData="evaluationChartData"
        />
        <div v-else>
          데이터를 불러올수 없습니다.
        </div>
                
      </v-card> -->
  </div> 
    
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import * as _ from 'lodash'
  import { useRoute } from 'vue-router';
  
  import { useStockStore } from '../store/stock';
  import { stockPayloads } from '../store/payload'
  import { priceFormatter, priceCompactFormatter } from '../mixins/tools';

  import ProgressCircular from '../components/global/ProgressCircular.vue';
  import EvaluationChart from '../components/detail/evaluation/EvaluationChart.vue'
  import StockInfo from '../components/detail/StockInfo.vue';
  import StockClose from '../components/detail/StockClose.vue';
    
  const route = useRoute()  
  const { request, stock, stockEvaluation } = useStockStore()    
  const evaluationChartData = computed(() => stockEvaluation.data)
  const data = computed(() => stock.data)

  const convertPrice = (price: number) => priceFormatter.format(price)
  const convertCompactPrice = (price: number) => priceCompactFormatter.format(price)

  const getPrefixer = (price: number) => price > 0 ? '+' + price.toLocaleString() : price.toLocaleString()
  const getPriceColor = (price: number) => price > 0 ? 'text-red' : 'text-blue'
  

  onMounted(() => {
    const code = route.params.code as string
    stockPayloads
      .forEach(payload => request(payload(code)))
  })
    
</script>

<style lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  margin-left: 10px;
  margin-top: 20px;
  padding: 5px;
  min-height: 60px;
  border-radius: 10px;
}

.SectorChip {
  font-size: 12px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stockCode {
  opacity: .6;
}
</style>