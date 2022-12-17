<template>  
  <transition name="fade" :duration="4000">
    <v-card
      class="CardLayout IndicatorCardLayout"
      color="cardlayout"    
      link
      v-if="loading"
    >      
      <v-card-text class="d-flex align-cetner justify-center mt-1">
        <StockIndicatorChart />      
      </v-card-text>
      <v-card-actions class="innerAction">
        <div class="innerMore"> 보조지표 확인하기</div>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStockStore } from '@/store/stock';
  import StockIndicatorChart from '@/components/detail/StockIndicatorChart.vue';

  const { indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const loading = computed<boolean>(() => !indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading)
  
</script>

<style scoped lang="scss">
.IndicatorCardLayout {
  height: 250px;  
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