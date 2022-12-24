<template>
  <canvas :id="propKey"></canvas>
</template>

<script setup lang="ts">
  import { priceCompactFormatter } from '@/mixins/tools';
import { Chart } from 'chart.js'
  import { ref, onMounted } from 'vue';

  interface Prop {
    type: string
    propKey: string
    chartData: number[]
    labels: string[]
  }

  const { propKey, chartData, labels, type } = defineProps<Prop>()

  const chart = ref<Chart>()

  const options = {

    plugins: {
      legend: { display: false },
      tooltip: {
        
      }
    },

    scales: {
      y: {
        display: false,
        beginAtZero: false,
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: 'white',
          callback: (ctx: number) => priceCompactFormatter.format(ctx).slice(1)
        }
      },

      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: 'white'
        }
      }

    }
  } as any

  const renderChart = () => {    
    const ctx = document.getElementById(propKey) as HTMLCanvasElement

    chart.value = new Chart(ctx, {
      data: {
        labels,
        datasets: [{      
          label: type,    
          type: 'bar',
          data: chartData,
          backgroundColor: '#1DE9B6',
        }]
      },
      options
    })

  }

  onMounted(() => {
    renderChart()
  })

</script>

<style scoped>

</style>