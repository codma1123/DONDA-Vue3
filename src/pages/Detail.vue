<template>
  <div class="DetailLayout">
    <div v-if="(!stock.loading && data && !stockEvaluation.loading)">      
      <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="2"
      >
        <v-card-title class="font-weight-bold d-flex justify-space-between">
          <div>
            <span>
              {{ data.name }}
            </span>
            <span class="ml-2 stockCode" v-font-size="15">
              {{ data.code }}              
            </span>
          </div>
          <div>
            <v-icon>mdi-bookmark-outline</v-icon>
          </div>
        </v-card-title>       
                
        <v-card-text>
          <v-chip label class="SectorChip"> 
            {{ data.sector }}
          </v-chip>          
        </v-card-text>

      </v-card>

      <v-card 
        class="CardLayout"
        color="cardlayout"
        elevation="2"
      >
        <div v-font-size="14" class="mt-3">
          시가총액 {{ convertCompactPrice(data.marcap) }}
        </div>
      </v-card>

      <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="2"
        link    
      >
        <EvaluationChart 
          v-if="!_.isEmpty(chartData)"
          :chartData="chartData"
        />
        <div v-else>
          데이터를 불러올수 없습니다.
        </div>
                
      </v-card>
    
    </div> 
    
    <ProgressCircular v-else absolute />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import * as _ from 'lodash'
  import { useRoute } from 'vue-router';
  
  import { useStockStore } from '../store/stock';
  import { getStock, getStockEvaluation } from '../store/payload'
  import { priceFormatter, priceCompactFormatter } from '../mixins/tools';

  import ProgressCircular from '../components/global/ProgressCircular.vue';
  import EvaluationChart from '../components/detail/evaluation/EvaluationChart.vue'
  

  const requestPayloads = [
    getStock,
    getStockEvaluation, 
  ]

  const route = useRoute()  
  const { request, stock, stockEvaluation } = useStockStore()    
  const chartData = computed(() => stockEvaluation.data)
  const data = computed(() => stock.data)

  const convertPrice = (price: number) => priceFormatter.format(price)
  const convertCompactPrice = (price: number) => priceCompactFormatter.format(price)

  const getPrefixer = (price: number) => price > 0 ? '+' + price.toLocaleString() : price.toLocaleString()
  const getPriceColor = (price: number) => price > 0 ? 'text-red' : 'text-blue'
  

  onMounted(() => {
    const code = route.params.code as string
    requestPayloads
      .forEach(requestPayload => request(requestPayload(code)))
  })
    
</script>

<style scoped lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  margin-left: 10px;
  margin-top: 20px;
  padding: 10px;
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