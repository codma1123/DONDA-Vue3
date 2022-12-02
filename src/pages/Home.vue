<template>
  <div v-if="!market.loading && !marketValuation.loading && !rank.loading">
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
      v-for="(rankContent, i) in rankContents"
      :key="i"
      :width="CONTENT_WIDTH"
      height="100"
      class="MarketCard"      
      theme="dark"
      color="information"        
    >
      <v-card-title> {{ rankContent.title }} </v-card-title>
      <v-card-subtitle>
        {{ rankContent.close }}
      </v-card-subtitle>
      
    </v-card>    
  </div>    
  <v-progress-circular v-else indeterminate color="primary" class="ProgressCircular" />
</template>

<script setup lang="ts">
  import { computed, onMounted } from "vue"
  import { useRouter } from "vue-router";
  import { useLayout } from "../mixins/layout";
  import { getMarketValuation, getTodayMarket, getRank } from "../store/payload"
  import { useStockStore } from "../store/stock"


  const { market, marketValuation, rank, request } = useStockStore()
  const router = useRouter()
  const { CONTENT_WIDTH } = useLayout()

  onMounted(async () => {
    if (market.data) return

    await request(getRank())
    await request(getTodayMarket())
    await request(getMarketValuation())  

  })

  const rankContents = computed(() => {
    const marcap = rank.data?.marcap || []
    return marcap
      .map(entry => ({ code: entry[1], title: entry[2], market: entry[3], close: entry[4], change: entry[5], changeRatio: entry[6] }))
      .slice(0, 5)
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


  &:first-child {
    margin-top: 50px;
  }
}



.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}


.HomeLayout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
