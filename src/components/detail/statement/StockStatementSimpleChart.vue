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
      legend: { display: false }
    },

    scales: {
      y: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: 'white',
          callback: (ctx: number) => priceCompactFormatter.format(ctx)
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
          data: chartData
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