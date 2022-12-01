<template>
  <div v-if="!market.loading && !marketValuation.loading">
    <v-sheet
      :width="CONTENT_WIDTH"
      :height="CONTENT_HEIGHT"
      class="MarketCard"      
      color="cardlayout"
      rounded="xl"
      v-for="content in marketValuation.data"        
      :key="content.market"
      @click="push(`/${content.market}`)"
    >
      <v-card-title v-font-size="30"> 
        {{ content.market }}        
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        {{ content.weeklyTrend }}                  
      </v-card-text>
    </v-sheet>
  </div>    
  <v-progress-circular v-else :value="100" color="primary"></v-progress-circular>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useLayout } from "../mixins/layout";
import { getMarketValuation, getTodayMarket } from "../store/payload"
import { useStockStore } from "../store/stock"

const { market, marketValuation, request } = useStockStore()
const { CONTENT_WIDTH, CONTENT_HEIGHT } = useLayout()
const router = useRouter()

const push = (path: string) => router.push(path)

onMounted(() => {
  if (market.data || market.loading) return

  request(getTodayMarket())
  request(getMarketValuation())  
})

const markets = computed(() => {
    
})
</script>

<style lang="scss" scoped>
$margin-size : 1.5rem;
.MarketCard {  
  margin: $margin-size;
  
  cursor: pointer;
  transition: all .5s ease-in-out;

  &:hover {
    font-size: 12px;
  }
}

.HomeLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
