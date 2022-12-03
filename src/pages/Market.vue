<template>
  <div v-if="(!market.loading && !marketValuation.loading)">    
    <div class="Title">
      <v-card-title v-font-size="25">
        시장 동향
      </v-card-title>        
      <v-card-subtitle> 주식 시장이 어떻게 변하고 있는지 알아보세요. </v-card-subtitle>      
    </div>
    <v-card
      v-for="(content, i) in marketValuation.data"        
      elevation="3"
      :key="content.market"
      class="MarketCard"      
      :width="CONTENT_WIDTH"
      :height="extendToggles[i] ? EXTEND_MARKET_HEIGHT : DEFAULT_MARKET_HEIGHT"
      color="cardlayout"
      @click="extension(i)"
    >
      <v-card-title> 
        {{ content.market }}
      </v-card-title>      
      <v-card-text class="d-flex align-end justify-space-between">        
        <div></div>
        <div class="d-flex flex-column align-end">
          <div>
            <span v-font-size="20"> 
              {{ computedMarket[i].close }} 
            </span>
            <span v-font-size="17" :class="['ml-3', computedMarket[i].colorClass]"> 
              {{ computedMarket[i].prefixer}}{{ computedMarket[i].changes}}
            </span>
          </div>
          <div>
            전주 대비 {{ marketValuation.data[i].weeklyTrend }}%
          </div>
        </div>
        
      </v-card-text>

      <v-card-actions v-if="extendToggles[i]">
        추가 컨텐츠 ... 
      </v-card-actions>

    </v-card>
  </div>
  <v-progress-circular 
    v-else
    class="ProgressCircular" 
    indeterminate 
    color="white"
    :value="100"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { useLayout } from "../mixins/layout";
  import { useStockStore } from "../store/stock"
  import { MarketType, MarketTypes } from '../models/stock' 
  
  // consts
  const marketTypes: MarketTypes[] = ['kospi', 'nasdaq', 'snp500', 'usdkrw']
  const DEFAULT_MARKET_HEIGHT = 160
  const EXTEND_MARKET_HEIGHT = 330

  // uses
  const { market, marketValuation, request } = useStockStore()
  const { CONTENT_WIDTH } = useLayout()

  // reactive values
  const extendToggles = ref<boolean[]>(marketTypes.map(() => false))

  const extension = (index: number) => extendToggles.value[index] = !extendToggles.value[index]

  const computedMarket = computed<any>(() => {
    const { data } = market
    return marketTypes.map(market => {
      const recent = (data as MarketType)[market].values?.at(-1)
      return {
        close: recent?.close ?? 0,
        changes: (recent?.changes ?? 0).toLocaleString(),
        prefixer: (recent?.changes ?? 0) > 0 ? '+' : '',
        colorClass: (recent?.changes ?? 0) > 0 ? 'text-red' : 'text-blue'
      }
    })
  })



</script>

<style lang="scss" scoped>
$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  border-radius: 1.2rem;
  padding-top: 10px;

  overflow: hidden;
    
  cursor: pointer;
  transition: height .8s ease-in-out;


  &:first-child {
    margin-top: 40px;
  }
}

.Title {
  margin-top: 75px;
  margin-left: 15px;
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}



</style>
