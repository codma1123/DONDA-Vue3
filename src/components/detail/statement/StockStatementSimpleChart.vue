<template>
  <canvas :id="propKey" class="StockStatementSimpleChart"></canvas>
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

    responsive: true,
    maintainAspectRatio: true,

    plugins: {
      legend: { display: false },
      tooltip: { }
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
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2
        }]
      },
      options
    })
  }

  onMounted(() => renderChart())

</script>

<style scoped>
.StockStatementSimpleChart {
}
</style>