<template>
  <transition name="fade" :duration="3300">
    <v-card 
      class="CardLayout" 
      color="cardlayout" 
      elevation="0"      
      @click="push(`/detail/${stock.data.code}/evaluation`)"
      v-if="loading && !_.isEmpty(stockEvaluation.data)"
    >
      <v-card-title class="innerTitle">        
        <v-chip label variant="text">
          <v-icon start class="mr-3">
            mdi-chart-gantt
          </v-icon>
          적정주가
      </v-chip>
      </v-card-title>    
      
      <v-card-text>
        <StockEvaluationChart />
      </v-card-text>  
      
      <v-card-actions>
        <div class="innerMore-absolute">
          적정주가 확인하기
        </div>
      </v-card-actions>
    </v-card> 
  </transition>  
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import StockEvaluationChart from '@/components/detail/StockEvaluationChart.vue';
  import _ from 'lodash'
  import { useCustomRouter } from '@/mixins/customRouter';

  const { push } = useCustomRouter()
  const { stockEvaluation, stock } = useStockStore()

  const loading = computed(() => !stockEvaluation.loading && !stock.loading)

  
</script>

<style scoped lang="scss">
.CardLayout {
  height: 200px;
}

.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .45s;
  }
}

</style>