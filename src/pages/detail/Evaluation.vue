<template>
  <div class="DetailLayout" v-if="loading">

    <!-- Title -->
    <StockTitle />

    <StockEvaluationInfo />

    <!-- <v-card class="CardLayout" elevation="0">
      <StockEvaluationChart propKey="detail"/>    
    </v-card> -->
    
    <!-- <StockEvaluationLineChart /> -->
    <StockEvaluationText :delay="400" />
    <StockEvaluationText :delay="700"/>
    <StockEvaluationText :delay="1000"/>

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
  
  onMounted(() => {
    console.log(stockEvaluation.data)
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