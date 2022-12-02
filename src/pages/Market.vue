<template>
  <v-sheet
    :width="CONTENT_WIDTH"
    :height="CONTENT_HEIGHT"
    class="MarketCard"      
    color="primary-darken-1"
    rounded="lg"
    v-for="(content, i) in marketValuation.data"        
    :key="content.market"
    @click="push(`/${content.market}`)"
  >
    <v-card-title class="text-h5"> 
      시장 현황
    </v-card-title>
    <v-card-subtitle>
      각종 시장 현황에 대해 알아보세요.
    </v-card-subtitle>
    <v-card-text class="d-flex align-center justify-center" v-font-size="20">
      종가 {{ computedMarket[i].close }}
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text">
        Listen Now
      </v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useLayout } from "../mixins/layout";
import { getMarketValuation, getTodayMarket } from "../store/payload"
import { useStockStore } from "../store/stock"
import { MarketType, MarketTypes } from '../models/stock' 

const marketTypes: MarketTypes[] = ['kospi', 'nasdaq', 'snp500', 'usdkrw']

const { market, marketValuation, request } = useStockStore()
const { CONTENT_WIDTH, CONTENT_HEIGHT } = useLayout()
const router = useRouter()

const push = (path: string) => router.push(path)

onMounted(() => {
  if (market.data || market.loading || marketValuation.data) return

  request(getTodayMarket())
  request(getMarketValuation())  

})

const computedMarket = computed<any>(() => {
  const { data } = market
  return marketTypes.map(market => ({
    close: (data as MarketType)[market].values?.at(-1)?.close ?? 0,
    changes: (data as MarketType)[market].values?.at(-1)?.changes ?? 0    
  }))
})

</script>

<style lang="scss" scoped>
$margin-size : 2rem;
.MarketCard {  
  margin: $margin-size;
    
  cursor: pointer;
  transition: all .5s ease-in-out;

  &:hover {
    font-size: 12px;
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-etner-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: all .5s ease;
}


.ProgressCircular {
  position: absolute;
  top: 50%;
}


.HomeLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
