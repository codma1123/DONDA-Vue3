<template>
  <canvas id="evaluationBackgroundChart"></canvas>
</template>

<script setup lang="ts">
import { Chart } from 'chart.js'
import { onMounted, ref } from 'vue';

interface EvaluationBackgroundChartProp {
  chartData: number[]  
}

const { chartData } = defineProps<EvaluationBackgroundChartProp>()

const chart = ref<Chart | null>(null)


const options = {} as any

const renderChart = () => {
  const ctx = document.getElementById('evaluationBackgroundChart')
  if(!(ctx instanceof HTMLCanvasElement)) return
  
}

onMounted(() => {

})


</script>

<style scoped>

</style>