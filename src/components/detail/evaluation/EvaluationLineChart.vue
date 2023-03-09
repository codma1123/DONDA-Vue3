<template>
  <canvas :id="id" class="chart"></canvas>
</template>

<script setup lang="ts">

  import { priceCompactFormatter } from '@/mixins/tools';
  import { myCrossHair } from '@/plugins/chart';
  import { useStockStore } from '@/store/stock';
  import { Chart, ChartOptions, TooltipItem } from 'chart.js'
  import { onMounted, ref } from 'vue';

  const { stockEvaluation, stockGraphAll, stock } = useStockStore()

  interface EvaluationLineChartProp {
    id: string
  }

  const { id } = withDefaults(defineProps<EvaluationLineChartProp>(), { id: 'evaluationLineChart' })
  
  const chart = ref<Chart>()

  const options: ChartOptions<'line'> = {
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: { 
      legend: {
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 13,
          }
        }
      },

      tooltip: {
        intersect: true,
        mode: 'index',
        backgroundColor: '#black',
        titleAlign: 'center',
        bodyAlign: 'left',
        bodySpacing: 5,
        padding: 10,
        cornerRadius: 15,
        bodyFont: { size: 12 },
        boxPadding: 5,
        callbacks: {
          label: (ctx: TooltipItem<'line'>) => '₩' + ctx.formattedValue,
        }
      },

    },

    scales: {
      x: {
        border: { display: false },  
        grid: { display: false },
        ticks: { display: false }
      },

      y: {
        border: { display: false },  
        grid: { display: false },
        ticks: {
          callback: (_, value: number) => priceCompactFormatter.format(value),
          color: 'white'
        }
      }
    }
  }

  const renderChart = () => {
    const ctx = document.getElementById(id)
    if(!(ctx instanceof HTMLCanvasElement)) return

    const labels: string[] = stockEvaluation.data.date
    const srim: number[] = stockEvaluation.data['S-rim']
    const properPrice: number[] = stockEvaluation.data['proper-price']
    
    const stockData = labels.map((label: string) => stockGraphAll.data[label + '-24'])

    chart.value = new Chart(ctx, {
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'S-rim',
            data: srim,
            borderColor: '#fc035a',
            backgroundColor: '#fff',
            pointRadius: 0,
            pointHitRadius: 50, 
          },
          {
            type: 'line',
            label: 'Proper-Price',
            data: properPrice,
            borderColor: '#0388fc',
            backgroundColor: '#fff',
            pointRadius: 0,
            pointHitRadius: 50,        
          },
          {
            type: 'line',
            label: stock.data.name,            
            data: stockData,
            fill: true,
            borderColor: '#1DE9B6',
            backgroundColor: '#1DE9B615',
            pointRadius: 0,
            pointHitRadius: 50,
          }
        ]
      },
      options,
      plugins: [myCrossHair]          
    })
  }

  onMounted(() => renderChart())

</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 20px;
}
</style>
