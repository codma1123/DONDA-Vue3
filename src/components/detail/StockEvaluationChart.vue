<template>
  <canvas id="evaluationChart"></canvas>
</template>

<script setup lang="ts">

  import { onMounted, ref, computed } from 'vue'
  import { Chart } from 'chart.js'
  import { useStockStore } from '@/store/stock';
  import { priceCompactFormatter } from '@/mixins/tools';

  const { stockEvaluation, stock } = useStockStore()

  const stockChartData = computed<number>(() => stock.data.close)
  const evaluationChartData = computed<number>(() => stockEvaluation.data['S-rim'].at(-1) as number)

  const chart = ref<Chart>()

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },

    scales: {
      x: {
        beginAtZero: false,
        grid: { color: (ctx: any) => ctx.tick.value === 0 ? '#fff': '' },              
        ticks: {
          display: false,
          color: 'white',
          callback: (ctx: any) => priceCompactFormatter.format(ctx)
        }
      },

      y: {        
        grid: { display: false },
        ticks: {
          color: 'white'
        }
      }
    }
  } as any

  const renderChart = () => {
    const ctx = document.getElementById('evaluationChart') as HTMLCanvasElement
    
    chart.value = new Chart(ctx, {
      data: {
        labels: ['현재주가', '적정주가'],
        datasets: [          
          {
            type: 'bar',
            data: [stockChartData.value, evaluationChartData.value],
            backgroundColor: (ctx: any) => ctx.index ? '#1DE9B6' : 'rgba(255, 99, 132, 0.9)',
            borderSkipped: false,
            borderRadius: 3,
            barThickness: 30
          }
        ]
      },
      options
    })

  }


  onMounted(() => renderChart())

</script>

<style>
#evaluationChart {
  max-height: 110px;
}
</style>

