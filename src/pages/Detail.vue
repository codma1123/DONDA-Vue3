<template>
  <div class="DetailLayout">
    <!-- <ProgressCircular v-if="stockEvaluation.loading" absolute />     -->

    <!--  종목 개괄 -->
    <StockTitle />

    <v-divider />

    <!-- 시가총액 -->
    <StockMarcap />

    <!-- 종가 -->
    <StockClose enableLink/>
  
    <StockEvaluation />

    <!-- 보조지표 -->
    <StockIndicator />

    <StockStatement />
    
    <!-- 재무제표 -->
    <!-- <StockFinance /> -->

    <!-- 유사종목 -->
    <!-- <StockSimilar /> -->
    
    <!-- 종목뉴스 -->
    <!-- <StockNews /> -->



    <!-- <v-card 
      class="CardLayout" 
      color="cardlayout"
      elevation="2"
      link    
      v-if="(!_.isEmpty(stockEvaluation.data) && !stockEvaluation.loading)"
    >
      <EvaluationChart           
        :chartData="stockEvaluation.data"
      />                        
    </v-card> -->

    <!-- <StockNews /> -->
  </div> 
    
</template>

<script setup lang="ts">
  import { computed, onMounted, toRefs, watch } from 'vue';
  import * as _ from 'lodash'
  import { useRoute, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
  
  import { useStockStore } from '@/store/stock';
  import { stockPayloads } from '@/store/payload'
  import { priceFormatter, priceCompactFormatter } from '@/mixins/tools';

  import ProgressCircular from '@/components/global/ProgressCircular.vue';
  import EvaluationChart from '@/components/detail/evaluation/EvaluationChart.vue'

  import StockInfo from '@/components/detail/StockInfo.vue';
  import StockMarcap from '@/components/detail/StockMarcap.vue';
  import StockClose from '@/components/detail/StockClose.vue'
  import StockNews from '@/components/detail/StockNews.vue'
  import StockIndicator from '@/components/detail/StockIndicator.vue'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockEvaluation from '@/components/detail/StockEvaluation.vue'
  import StockStatement from '@/components/detail/StockStatement.vue'
    
  const route = useRoute()  
  const store = useStockStore()
  const param = computed(() => route.params.id as string)

  const convertPrice = (price: number) => priceFormatter.format(price)
  const convertCompactPrice = (price: number) => priceCompactFormatter.format(price)

  const getPrefixer = (price: number) => price > 0 ? '+' + price.toLocaleString() : price.toLocaleString()
  const getPriceColor = (price: number) => price > 0 ? 'text-red' : 'text-blue'

  const fetch = (code: string): void => {    
    if (store.currentStock === code) return
    
    stockPayloads.forEach(payload => store.request(payload(code)))
    store.currentStock = code    
  }
  
  onMounted(() => fetch(route.params.code as string))
  
  onBeforeRouteUpdate((to: RouteLocationNormalized) => fetch(to.params.code as string))    
    
</script>

<style lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  margin-left: 10px;
  margin-top: 20px;
  padding: 5px;
  min-height: 60px;
  border-radius: 10px;
}

.SectorChip {
  font-size: 12px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stockCode {
  opacity: .6;
}

.innerTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.innerMore {
  text-align: end;
  top: 25px;
  right: 10px;  
  font-size: 10px;
  opacity: .8;
  cursor: pointer;
}

.innerMore-absolute {
  position: absolute;
  right: 20px;  
  bottom: 12px;
  font-size: 10px;
  opacity: .8;
  cursor: pointer;
}


// transition
.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .25s;
  }

  .innerMore {
    transition: opacity 0.3s ease-in-out;
    transition-delay: 1s;
  }
}

.fade-enter-from {
  .innerTitle {
    transform: translateX(30px);
    opacity: 0;
  }

  .innerMore {
    opacity: 0;
  }
}

.fade-leave-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;
  }

  .innerMore {
    transition: opacity 0.3s ease-in-out;
  }
}

.fade-leave-to {
  .innerTitle {
    transform: translateX(30px);
    opacity: 0;
  }

  .innerMore {
    transform: translateY(30px);
    opacity: 0;
  }
}



</style>