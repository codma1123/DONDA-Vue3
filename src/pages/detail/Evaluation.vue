<template>
  <div class="DetailLayout" v-if="loading">

    <!-- Title -->
    <StockTitle />

    <StockEvaluationInfo />

    <!-- <v-card class="CardLayout" elevation="0">
      <StockEvaluationChart propKey="detail"/>    
    </v-card> -->
    
    <!-- <StockEvaluationLineChart /> -->
    <StockEvaluationText :delay="400">
      <template #title>
        {{ evaluation.value }}% {{ evaluation.text }}되었습니다.
      </template>
      <template #subtitle>
        {{ evaluation.text }}?
      </template>
    </StockEvaluationText>


    <StockEvaluationText :delay="700" />
    <StockEvaluationText :delay="1000" />

    <!-- {{  stockEvaluation.data  }} -->


  </div> 
</template>

<script setup lang="ts">

  import { computed, onMounted } from 'vue'
  import { useStockStore } from '@/store/stock'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockEvaluationInfo from '@/components/detail/evaluation/EvaluationInfo.vue'
  import StockEvaluationLineChart from '@/components/detail/evaluation/EvaluationLineChart.vue'
  import StockEvaluationText from '@/components/detail/evaluation/EvaluationText.vue'
  

  const { stockEvaluation, stockEvaluationDaily, stock, stockGraphAll } = useStockStore()
  const loading = computed(() => !stockEvaluation.loading && !stock.loading)
  
  const evaluation = computed(() => {
    const close = stock.data.close
    const evaluationClose = stockEvaluation.data['S-rim'].at(-1) as number
    const highVal = close > evaluationClose

    return {
      text: highVal ? '고평가' : '저평가',
      textClass: highVal ? 'blue-text' : 'red-text',
      value: (Math.abs((close - evaluationClose) /  evaluationClose * 100)).toFixed(1)
    }
  })
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  padding-top: 0px;
  margin-top: 5px;
}


</style>