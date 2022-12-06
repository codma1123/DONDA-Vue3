<template>
  <canvas id="evaluationChart"></canvas>
</template>

<script setup lang="ts">
  import { Chart } from 'chart.js';
  import { onMounted } from 'vue';
  import { EvaluationType } from '../../../models/stock';


  const { chartData } = defineProps<{ chartData: EvaluationType}>()

  const renderChart = () => {
    const ctx = document.getElementById('evaluationChart') as HTMLCanvasElement 

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.date,
        datasets: [{
          data: chartData['S-rim']
        }]
      }      
    })
  }

  onMounted(() => {
    renderChart()
  })
</script>

<style scoped>

</style>