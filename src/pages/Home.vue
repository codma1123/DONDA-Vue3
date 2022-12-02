<template>
  <transition name="fade">    
    <div v-if="!market.loading && !marketValuation.loading">
      <v-card
        :width="CONTENT_WIDTH"
        height="120"
        class="MarketCard"      
        theme="dark"
        color="#385F73"        
        @click="router.push('/market')"
      >
        <v-card-title> 시장 동향 </v-card-title>
      </v-card>

      <v-card
        :width="CONTENT_WIDTH"
        height="200"
        class="MarketCard"      
        theme="dark"
        color="#952175"        
      >
        <v-card-title> 추천 종목 </v-card-title>
      </v-card>


      <v-card
        :width="CONTENT_WIDTH"
        height="500"
        class="MarketCard"      
        theme="dark"
        color="error"        
      >
        <v-card-title> 추천 종목 </v-card-title>
      </v-card>
      

    </div>    
    <div v-else>
      <v-progress-circular :value="100" color="black" class="ProgressCircular"></v-progress-circular>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useRouter } from "vue-router";
import { useLayout } from "../mixins/layout";
import { getMarketValuation, getTodayMarket } from "../store/payload"
import { useStockStore } from "../store/stock"


const { market, marketValuation, request } = useStockStore()
const router = useRouter()
const { CONTENT_WIDTH } = useLayout()
onMounted(() => {
  if (market.data || market.loading || marketValuation.data) return

  request(getTodayMarket())
  request(getMarketValuation())  

})

</script>

<style lang="scss" scoped>
$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  border-radius: .25rem;
    
  font-family: 'Hahmlet', serif;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Poppins', sans-serif;

  
    
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
