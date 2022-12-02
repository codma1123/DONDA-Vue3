<template>
  <div v-if="!market.loading && !marketValuation.loading && !rank.loading">
    <v-card
      :width="CONTENT_WIDTH"
      height="120"
      class="MarketCard"
      theme="dark"
      color="#333333"
      elevation="3"
    >
      <v-card-title class="mt-3"> 시장 동향 </v-card-title>
      <v-card-subtitle> 주식 시장이 어떻게 변하고 있는지 알아보세요. </v-card-subtitle>      
      <v-btn       
        class="vBtn"  
        variant="text"
        @click="$router.push('/market')" 
        icon="mdi-chevron-right"
      />
    </v-card>

    <v-card
      :width="CONTENT_WIDTH"
      height="130"
      class="MarketCard"      
      theme="dark"   
      color="#333333"   
      elevation="3"
    >
      <v-card-title class="mt-3"> 추천 종목 </v-card-title>
      <v-card-subtitle class="vCardSubtitle"> DONDA 가 기업 가치가 상대적으로 저평가된 종목들을 추천해줍니다.</v-card-subtitle>
      <v-btn       
        class="vBtn"  
        variant="text"
        @click="$router.push('/market')" 
        icon="mdi-chevron-right"
      />
    </v-card>
    
    <div class="d-flex justify-space-between mt-8 align-end">
      <v-card-title class="ml-3" v-font-size="16">
        시가총액이 높은 기업들입니다.
      </v-card-title>      
      <v-btn 
        variant="plain" 
        v-font-size="12" 
        class="mr-2"
        @click="$router.push('/rank')"
      >
        자세히..
      </v-btn>
    </div>

    <v-card
      v-for="(rankContent, i) in rankContents"
      :key="i"
      :width="CONTENT_WIDTH"
      height="80"
      class="MarketCard"      
      theme="dark"
      color="#333333"
      elevation="2"
    >
      <v-card-subtitle v-font-size="15" class="mt-2"> {{ rankContent.market }} </v-card-subtitle>
      <div class="d-flex align-center justify-space-between">
        <v-card-title v-font-size="18"> {{ rankContent.title }} </v-card-title>
        <div class="mr-3" v-font-size="18"> {{ rankContent.close }} </div>
      </div>            
    </v-card> 

    <div class="d-flex justify-center align-center">      
      <v-progress-circular v-if="rankCountLoad" indeterminate class="mb-2" color="white"/>    
      <Observer v-if="rankCountLoad" @triggerIntersected="loadMore"/>
    </div>

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
  import { computed, onMounted, ref } from "vue"
  import { useLayout } from "../mixins/layout";
  import { getMarketValuation, getTodayMarket, getRank } from "../store/payload"
  import { useStockStore } from "../store/stock"
  import { priceFormatter } from '../mixins/tools'
  import Observer from "../components/Observer.vue";


  const { market, marketValuation, rank, request } = useStockStore()
  const { CONTENT_WIDTH } = useLayout()
  const rankCount = ref<number>(8)
  const rankCountLoad = ref<boolean>(true)

  onMounted(() => {
    if (market.data) return

    request(getRank())
    request(getTodayMarket())
    request(getMarketValuation())  
  })

  const rankContents = computed(() => {
    const marcap = rank.data?.marcap || []
    return marcap
      .map(entry => ({ 
        code: entry[1], 
        title: entry[2], 
        market: entry[3], 
        close: priceFormatter.format(entry[4] as number), 
        change: entry[5], changeRatio: entry[6] 
      }))
      .slice(0, rankCount.value)
  })

  

  const loadMore = (): void => { 
    if (rankCount.value > 44) {
      rankCountLoad.value = false
      return
    }

    new Promise(resolve => {
        setTimeout(() => {
        rankCount.value += 5 
        resolve(rankCount.value)
      }, 500)      
    })
  }


</script>

<style lang="scss" scoped>
$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  border-radius: 1.2rem;
    
  font-family: 'Hahmlet', serif;
  font-family: 'Noto Sans KR', sans-serif;
  font-family: 'Poppins', sans-serif;
      
  transition: all .5s ease-in-out;
  cursor: pointer;


  &:first-child {
    margin-top: 70px;
    cursor: default;
  }

  &:nth-child(3) {
    margin-top: 20px;
  }
    
  .vCardSubtitle {
    white-space: normal;
    word-break: normal;
  }
}

.vBtn {
    position: absolute;
    bottom: 5px;
    right: 5px;
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
