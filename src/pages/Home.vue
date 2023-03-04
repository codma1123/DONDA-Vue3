<template>
  <div v-if="loading">

    <!-- 시장 동향 -->
    <MarketTrend />

    <!-- 추천 종목 -->
    <RecommendStock />

    <!-- 시가총액이 높은 기업들 -->
    <MainStocks />

  </div>    
  <ProgressCircular v-else absolute />
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { useStockStore } from "@/store/stock"

  import MarketTrend from "@/components/home/MarketTrend.vue"
  import RecommendStock from "@/components/home/RecommendStock.vue"
  import ProgressCircular from "@/components/global/ProgressCircular.vue"
  import MainStocks from "@/components/home/MainStocks.vue"

  const { market, marketValuation, rank, fetchMarket } = useStockStore()
  const loading = computed<boolean>(() => (!market.loading && !marketValuation.loading && !rank.loading))

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
