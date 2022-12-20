<template>
  <transition name="fade" :duration="3300">
    <v-card 
      class="CardLayout" 
      color="cardlayout" 
      elevation="0"      
      @click="push"
    >
      <v-card-title class="innerTitle">        
        <div class="d-flex justify-center">
          <v-chip label variant="text">
            <v-icon start class="mr-3">
              mdi-chart-gantt
            </v-icon>
            적정주가
          </v-chip>
          <div class="ml-11">             
          </div>
        </div>    
      </v-card-title>    
      
      <v-card-text v-if="loading && !_.isEmpty(stockEvaluation.data)">
        <StockEvaluationChart />
      </v-card-text>  
      <v-card-text v-else>
        데이터가 없습니다.
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
  import { useRouter } from 'vue-router';
  import StockEvaluationChart from '@/components/detail/StockEvaluationChart.vue';
  import _ from 'lodash'

  const router = useRouter()
  const { stockEvaluation, stock } = useStockStore()

  const loading = computed(() => !stockEvaluation.loading && !stock.loading)

  const push = () => router.push(`/detail/${stock.data.code}/evaluation`)
  
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