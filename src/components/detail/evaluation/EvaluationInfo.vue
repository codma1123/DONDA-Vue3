<template>
  <v-divider />

  <v-card class="" elevation="0">

    <v-sheet class="EvaluationChartSheet">
      
    </v-sheet>

    <div class="date"> 기준일 : {{ date }}</div>

    <v-card-subtitle class="mt-2">
      현재 주가
    </v-card-subtitle>
    <v-card-text v-font-size="35">
      {{ stockClose }}
    </v-card-text>
    <v-card-subtitle class="mt-2">
      적정 주가      
    </v-card-subtitle>
    <v-card-text v-font-size="35">
      {{ evaluationClose }}
    </v-card-text>

    <v-divider />


  </v-card>
</template>

<script setup lang="ts">
  import { priceFormatter } from '@/mixins/tools';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'


  const { stock, stockEvaluation } = useStockStore()

  const stockClose = computed(() => priceFormatter.format(stock.data.close))
  const date = computed(() => stock.data.date)
  const evaluationClose = computed(() => priceFormatter.format(stockEvaluation.data['S-rim'].at(-1) as number))
  
</script>

<style scoped lang="scss">
.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
}

.EvaluationChartSheet {
  position: absolute;
  right: 5px;
  top: 40px;
  width: 150px;
  height: 110px;
}


</style>