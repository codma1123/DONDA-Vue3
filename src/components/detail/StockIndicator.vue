<template>  
  <transition name="fade" :duration="4000">    
    <v-card
      class="CardLayout IndicatorCardLayout"
      color="cardlayout"    
      @click="push(`/detail/${route.params.param}/indicator`)"
      v-if="loading"      
    >      
      <v-card-title class="innerTitle">        
        <v-chip label variant="text">
          <v-icon start class="mr-3">
            mdi-cash-plus
          </v-icon>
          보조지표
        </v-chip>
      </v-card-title>    

      <v-card-text class="d-flex align-cetner justify-center mt-1">
        <StockIndicatorChart />      
      </v-card-text>
      <v-card-actions class="innerAction">
        <div class="innerMore-absolute"> 보조지표 확인하기</div>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStockStore } from '@/store/stock'
  import StockIndicatorChart from '@/components/detail/StockIndicatorChart.vue'
  import { useCustomRouter } from '@/mixins/customRouter';
  import { useRoute } from 'vue-router';

  const { push } = useCustomRouter()
  const route = useRoute()
  

  const { indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const loading = computed<boolean>(() => !indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading)
  
</script>

<style scoped lang="scss">
.IndicatorCardLayout {
  height: 280px;  
}

.innerAction {
  display: flex;
  justify-content: center;
}



.fade-enter-active {
  .innerAction {
    transition: all 0.5s ease-in-out;
    transition-delay: 1.75s;
  }
}

</style>