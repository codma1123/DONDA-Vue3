<template>
  <canvas id="evaluationChart"></canvas>
</template>

<script setup lang="ts">
  import { Chart } from 'chart.js';
  import { onMounted } from 'vue';
  import { EvaluationType } from '../../../models/stock';

  const { chartData } = defineProps<{ chartData: EvaluationType}>()
  
  const options = {
    plugins: {
        legend: {
        display: false
      }
    },

    animation: {      
      easing: 'easeInOutCubic'
    },
        
    scales: {
      x: {
        border: {
          display: false
        },
        grid: {
          display: false
        },
        ticks: {
          color: 'white'
        }
      },
            
      y: {
        border: {
          display: false
        },
        grid: {
          display: false
        },        
        ticks: {
          color: 'white'
        }
      }
    },    
  }

  const renderChart = () => {
    const ctx = document.getElementById('evaluationChart') as HTMLCanvasElement 

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.date,
        datasets: [{
          label: '',
          data: chartData['S-rim']
        }]
      },
      options: options as any
    })


  }

  onMounted(() => renderChart())
</script>

<style scoped>

</style>