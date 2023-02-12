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
        <div class="innerMore">
          재무제표 자세히보기
        </div>
      </v-card-title>        
    </v-card>
  </transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStockStore } from '@/store/stock'
  import { useCustomRouter } from '@/mixins/customRouter';
  import { useRoute } from 'vue-router';

  const { push } = useCustomRouter()
  const route = useRoute()
  
  const { indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const loading = computed<boolean>(() => !indicator.loading && !indicatorSector.loading && !indicatorSectorDaily.loading && !indicatorDaily.loading)
  
</script>

<style scoped lang="scss">

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