<template>  
  <transition name="fade" :duration="4000">
    <v-card
      class="CardLayout IndicatorCardLayout"
      color="cardlayout"    
      v-if="loading"
    >
      <v-card-title>적정 주가</v-card-title>
      <v-card-subtitle>기업의 적정주가는 얼마일까요?</v-card-subtitle>
      <v-card-text class="d-flex align-cetner justify-center">
        <StockIndicatorChart />      
      </v-card-text>
      <v-card-actions class="innerAction">
        설명 ..
        <div class="innerMore"> 적정주가 정보 확인하기</div>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '../../store/stock';
  import { computed } from 'vue'
  import StockIndicatorChart from './StockIndicatorChart.vue';

  const { indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const loading = computed<boolean>(() => !indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading)
  
</script>

<style scoped lang="scss">
.IndicatorCardLayout {
  height: 350px;  
}

.innerAction {
  display: flex;
  justify-content: center;
}

.innerMore {
  position: absolute;
  right: 20px;  
  bottom: 12px;
  font-size: 10px;
  opacity: .8;
  cursor: pointer;
}

.fade-enter-active {
  .innerAction {
    transition: all 0.5s ease-in-out;
    transition-delay: 1.75s;
  }
}

.fade-enter-from {
  .innerAction {
    // transform: translateY(30px);
    opacity: 0;
  }
}

.fade-leave-active {
  .innerAction {
    transition: all 0.3s ease-in-out;
  }
}
</style>