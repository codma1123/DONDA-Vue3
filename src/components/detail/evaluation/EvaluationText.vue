<template>
  
  <v-card elevation="0">
    <v-card-title v-font-size="35" :class="[evaluation.textClass, 'mt-2']">
      
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { useStockStore } from '@/store/stock';
import { computed } from 'vue';

  const { stock, stockEvaluation } = useStockStore()

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

<style scoped>

</style>