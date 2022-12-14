<template>
  <div class="DetailLayout">
    <!-- <ProgressCircular v-if="stockEvaluation.loading" absolute />     -->

    <!--  종목 개괄 -->
    <StockInfo />

    <!-- 시가총액 -->
    <StockMarcap />

    <!-- 종가 -->
    <StockClose />

    <!-- 보조지표 -->
    <StockIndicator />
    
    <!-- 재무제표 -->
    <!-- <StockFinance /> -->

    <!-- 유사종목 -->
    <!-- <StockSimilar /> -->
    
    <!-- 종목뉴스 -->
    <StockNews />



    <!-- <v-card 
      class="CardLayout" 
      color="cardlayout"
      elevation="2"
      link    
      v-if="(!_.isEmpty(stockEvaluation.data) && !stockEvaluation.loading)"
    >
      <EvaluationChart           
        :chartData="stockEvaluation.data"
      />                        
    </v-card> -->
-
    <!-- <StockNews /> -->
  </div> 
    
</template>

<script setup lang="ts">
  import { computed, onMounted, toRefs } from 'vue';
  import * as _ from 'lodash'
  import { useRoute } from 'vue-router';
  
  import { useStockStore } from '../store/stock';
  import { stockPayloads } from '../store/payload'
  import { priceFormatter, priceCompactFormatter } from '../mixins/tools';

  import ProgressCircular from '../components/global/ProgressCircular.vue';
  import EvaluationChart from '../components/detail/evaluation/EvaluationChart.vue'

  import StockInfo from '../components/detail/StockInfo.vue';
  import StockMarcap from '../components/detail/StockMarcap.vue';
  import StockClose from '../components/detail/StockClose.vue'
  import StockNews from '../components/detail/StockNews.vue'
  import StockIndicator from '../components/detail/StockIndicator.vue'
    
  const route = useRoute()  
  const store = useStockStore()    

  const convertPrice = (price: number) => priceFormatter.format(price)
  const convertCompactPrice = (price: number) => priceCompactFormatter.format(price)

  const getPrefixer = (price: number) => price > 0 ? '+' + price.toLocaleString() : price.toLocaleString()
  const getPriceColor = (price: number) => price > 0 ? 'text-red' : 'text-blue'
  

  onMounted(() => {
    const code = route.params.code as string

    if (store.currentStock === code) return
    
    stockPayloads.forEach(payload => store.request(payload(code)))
    store.currentStock = code    
        
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