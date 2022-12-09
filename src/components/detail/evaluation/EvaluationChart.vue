<template>
  <canvas id="evaluationChart"></canvas>
</template>

<script setup lang="ts">
  import { Chart } from 'chart.js';
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { EvaluationType } from '../../../models/stock';

  const { chartData } = defineProps<{ chartData: EvaluationType}>()
  const chart = ref<Chart>()
  
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
          display: false,      
        }
      }
    },    
  } as any

  const renderChart = () => {
    const ctx = document.getElementById('evaluationChart') as HTMLCanvasElement 

    chart.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.date,
        datasets: [{
          label: '',
          data: chartData['S-rim'].map(v => v * 0.9)
        }]
      },
      options
    })  
  }

  onMounted(() => renderChart())
</script>

<style scoped>

</style>