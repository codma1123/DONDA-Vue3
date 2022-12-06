<template>
  <div class="DetailLayout">
    <div v-if="(!stock.loading && stock.data)">      
      <v-card 
        class="CardLayout" 
        color="cardlayout"
        elevation="5"
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
          <dsiv>
            <v-icon @click="clickTest">mdi-bookmark-outline</v-icon>
          </dsiv>
        </v-card-title>        
        <v-card-text v-font-size="20">
          {{ convertPrice(stock.data.close) }}
        </v-card-text>
      </v-card>
    </div> 
    <ProgressCircular v-else absolute />
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStockStore } from '../store/stock';
  import { getStock } from '../store/payload'
  import { priceFormatter } from '../mixins/tools';
  import ProgressCircular from '../components/global/ProgressCircular.vue';


  const route = useRoute()
  
  const { request, stock } = useStockStore()  

  onMounted(() => {
    const code = route.params.code as string
    request(getStock(code))
  })

  const convertPrice = (price: number) => priceFormatter.format(price)
  


  const clickTest = () => {
    console.log('click!')  
  }

</script>

<style scoped lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  margin-left: 10px;
  padding: 10px;
  min-height: 150px;
  border-radius: 10px;
}

.stockCode {
  opacity: .6;
}
</style>