<template>
  <div class="DetailLayout">
    <div v-if="(!stock.loading && stock.data && !stockEvaluation.loading)">      
      <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="2"
      >
        <v-card-title class="font-weight-bold d-flex justify-space-between">
          <div>
            <span>
              {{ stock.data.name }}
            </span>
            <span class="ml-2 stockCode" v-font-size="15">
              {{ stock.data.code }}
            </span>
          </div>
          <div>
            <v-icon>mdi-bookmark-outline</v-icon>
          </div>
        </v-card-title>        
        <v-card-text v-font-size="20">
          {{ convertPrice(stock.data.close) }}
        </v-card-text>
      </v-card>

      <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="2"
      >
        {{ stockEvaluation.data }}
      </v-card>
    </div> 
    
    <ProgressCircular v-else absolute />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStockStore } from '../store/stock';
  import { getStock, getStockEvaluation } from '../store/payload'
  import { priceFormatter } from '../mixins/tools';
  import ProgressCircular from '../components/global/ProgressCircular.vue';

  const requestPayloads = [
    getStock,
    getStockEvaluation, 
  ]

  const route = useRoute()  
  const { request, stock, stockEvaluation } = useStockStore()  

  const convertPrice = (price: number) => priceFormatter.format(price)
  
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
  min-height: 150px;
  border-radius: 10px;
}

.stockCode {
  opacity: .6;
}
</style>