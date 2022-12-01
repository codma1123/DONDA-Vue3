<template>
  <transition name="fade">
    <div v-if="!market.loading && !marketValuation.loading">
      <v-sheet
        v-if="!market.loading && !marketValuation.loading"
        :width="CONTENT_WIDTH"
        :height="CONTENT_HEIGHT"
        class="MarketCard"      
        color="primary-darken-1"
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
    <div v-else>
      <v-progress-circular :value="100" color="primary" class="ProgressCircular"></v-progress-circular>
    </div>
  </transition>
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
