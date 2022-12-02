<template>
  <div>    
    <div class="Title">
      <v-card-title v-font-size="25">
        시장 동향
      </v-card-title>        
      <v-card-subtitle> 주식 시장이 어떻게 변하고 있는지 알아보세요. </v-card-subtitle>      
    </div>
    <v-sheet
      v-for="(content, i) in marketValuation.data"        
      :key="content.market"
      class="MarketCard"      
      :width="CONTENT_WIDTH"
      :height="heights[i]"
      color="cardlayout"
      @click="extension(i)"
    >
      <v-card-title> 
        {{ content.market }}
      </v-card-title>      
      <v-card-text class="d-flex align-center justify-center" v-font-size="20">
        종가 {{ computedMarket[i].close }}
      </v-card-text>

    </v-sheet>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { useLayout } from "../mixins/layout";
  import { useStockStore } from "../store/stock"
  import { MarketType, MarketTypes } from '../models/stock' 
  
  const { market, marketValuation } = useStockStore()
  const { CONTENT_WIDTH } = useLayout()
  const router = useRouter()


  const marketTypes: MarketTypes[] = ['kospi', 'nasdaq', 'snp500', 'usdkrw']
  const heights = ref<number[]>([160, 160, 160, 160])


  const push = (path: string) => router.push(path)

  const extension = (i: number) => heights.value[i] = heights.value[i] === 160 ? 300 : 160

  const computedMarket = computed<any>(() => {
    const { data } = market
    return marketTypes.map(market => ({
      close: (data as MarketType)[market].values?.at(-1)?.close ?? 0,
      changes: (data as MarketType)[market].values?.at(-1)?.changes ?? 0    
    }))
  })

</script>

<style lang="scss" scoped>
$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  border-radius: 1.2rem;
  padding-top: 10px;
    
  cursor: pointer;
  transition: all .5s ease-in-out;

  &:hover {
    font-size: 12px;
  }

  &:first-child {
    margin-top: 40px;
  }
}

.Title {
  margin-top: 75px;
  margin-left: 15px;
}



</style>
