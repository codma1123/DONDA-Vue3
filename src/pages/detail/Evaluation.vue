<template>
  <div class="DetailLayout" v-if="loading">

    <!-- Title -->
    <StockTitle />

    <StockEvaluationInfo />

    <v-card class="CardLayout">
      <StockEvaluationChart propKey="detail"/>
    </v-card>

    <StockEvaluationText />


  </div>
</template>

<script setup lang="ts">

  import { computed, onMounted } from 'vue'
  import StockEvaluationChart from '@/components/detail/StockEvaluationChart.vue';
  import { useStockStore } from '@/store/stock';
  import StockTitle from '@/components/detail/StockTitle.vue';
  import StockEvaluationInfo from '@/components/detail/evaluation/EvaluationInfo.vue';
  import StockEvaluationText from '@/components/detail/evaluation/EvaluationText.vue'

  const { stockEvaluation, stock } = useStockStore()
  const loading = computed(() => !stockEvaluation.loading && !stock.loading)
  
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