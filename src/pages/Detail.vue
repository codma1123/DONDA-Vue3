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

    <!-- 적정주가 -->
    <StockEvaluation />

    <!-- 보조지표 -->
    <StockIndicator />

    <!-- 재무제표 -->
    <StockStatement />

    <!-- 종목뉴스 -->
    <StockNews />


  </div> 
    
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRoute, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
  
  import { useStockStore } from '@/store/stock';
  import { useAppStore } from '@/store/app';

  import StockMarcap from '@/components/detail/StockMarcap.vue';
  import StockClose from '@/components/detail/StockClose.vue'
  import StockNews from '@/components/detail/StockNews.vue'
  import StockIndicator from '@/components/detail/StockIndicator.vue'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockEvaluation from '@/components/detail/StockEvaluation.vue'
  import StockStatement from '@/components/detail/StockStatement.vue'
    
  const { params } = useRoute()  
  const { fetchStock } = useStockStore()
  const { scrollReset } = useAppStore()
          
  onMounted(() => {
    fetchStock(params.code)
    scrollReset()
  })
    
  onBeforeRouteUpdate((to: RouteLocationNormalized) => fetchStock(to.params.code))
    
</script>

<style lang="scss">

$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 40px;
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
    // transition: all 0.001s ease-in-out;
  }

  .innerMore {
    // transition: opacity 0.001s ease-in-out;
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