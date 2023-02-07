<template>
  <canvas id="evaluationLineChart"></canvas>
</template>

<script setup lang="ts">

  import { priceCompactFormatter } from '@/mixins/tools';
  import { useStockStore } from '@/store/stock';
  import { Chart } from 'chart.js'
  import { onMounted, ref } from 'vue';

  const { stockEvaluation, stockGraphAll } = useStockStore()

  const chart = ref<Chart>()
  const options = {
    plugins: { 
      legend: { display: false },
      tooltip: {
        intersect: true,
        mode: 'index',
        backgroundColor: '#black',
        titleAlign: 'center',
        bodyAlign: 'center',
        bodySpacing: 5,
        padding: 10,
        cornerRadius: 15,
        bodyFont: { size: 12 },
        boxPadding: 5,
        callbacks: { label: (ctx: any) => ctx.datasetIndex === 0 ? '₩' + ctx.formattedValue : ctx.formattedValue }
      },
    },
    responsive: true,

    scales: {
      x: {
        border: { display: false },  
        grid: { display: false },
        ticks: {
          color: 'white'
        }
      },

      y: {
        border: { display: false },  
        grid: { display: false },
        ticks: {
          callback: (ctx: any) => priceCompactFormatter.format(ctx),
          color: 'white'

        }
      }
    }


  } as any

  const renderChart = () => {
    const ctx = document.getElementById('evaluationLineChart') as HTMLCanvasElement
    const labels: string[] = stockEvaluation.data.date
    const srim: number[] = stockEvaluation.data['S-rim']
    const properPrice: number[] = stockEvaluation.data['proper-price']
    
    const stockData = labels.map((label: string) => stockGraphAll.data[label + '-24'])
    console.log(stockData)

    chart.value = new Chart(ctx, {
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: '',
            data: srim,
            borderColor: '#1DE9B6',
            backgroundColor: '#fff',          
            pointBackgroundColor: '#fff',
            pointRadius: 5,
            pointHoverBorderColor: '#fff',
            pointHoverBackgroundColor: '#1DE9B6',
            pointHitRadius: 10
          },
          {
            type: 'line',
            label: '',
            data: stockData,
            borderColor: 'orange',
            pointRadius: 5,
            pointHitRadius: 10
          }
        ]
      },
      options,             
    })
  }

  onMounted(() => renderChart())

</script>

<style scoped>

</style>