<template>
  <div v-if="(!market.loading && !marketValuation.loading && !rank.loading)">

    <!-- 시장 동향 -->
    <MarketTrend />

    <!-- 추천 종목 -->
    <RecommendStock />

    <!-- 시가총액이 높은 기업들 -->
    <MainStocks />

  </div>    
  <ProgressCircular absolute v-else />
</template>

<script setup lang="ts">
  import { ref, computed } from "vue"
  import { useStockStore } from "@/store/stock"

  import MarketTrend from "@/components/home/MarketTrend.vue"
  import RecommendStock from "@/components/home/RecommendStock.vue"
  import ProgressCircular from "@/components/global/ProgressCircular.vue"
  import MainStocks from "@/components/home/MainStocks.vue"

  const emit = defineEmits<{ (e: 'mount'): void }>()

  const { market, marketValuation, rank } = useStockStore()

  const rankCount = ref<number>(8)
  const rankCountLoad = ref<boolean>(true)

  const marcap = computed(() => rank.data.marcap.slice(0, rankCount.value))
    
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

<style lang="scss">

$margin-size : 1rem;
.MarketCard {  
  margin: $margin-size;
  padding-top: 10px;
  border-radius: .5rem;
          
  transition: all .5s ease-in-out;
  cursor: pointer;


  &:first-child {
    margin-top: 55px;
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


</style>
