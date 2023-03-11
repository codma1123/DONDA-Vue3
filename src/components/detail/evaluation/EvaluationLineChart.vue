<template>
  <canvas :id="id" class="chart"></canvas>
</template>

<script setup lang="ts">

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

  const CHART_TYPE = 'line' as const
  type ChartType = typeof CHART_TYPE

  const options: ChartOptions<ChartType> = {
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
            size: 12
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
          label: (ctx: TooltipItem<ChartType>) => '₩' + ctx.formattedValue,
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
        ticks: { display: false }
      }
    }
  }

  const renderChart = () => {
    const ctx = document.getElementById(id)
    if(!(ctx instanceof HTMLCanvasElement)) return

    const labels = stockEvaluation.data.date
    const srim = stockEvaluation.data['S-rim']
    const properPrice = stockEvaluation.data['proper-price']
    
    const stockData = labels.map(label => stockGraphAll.data[label + '-24'])

    chart.value = new Chart(ctx, {
      data: {
        labels,
        datasets: [
          {
            type: CHART_TYPE,
            label: 'S-rim',
            data: srim,
            borderColor: '#fc035a',
            pointRadius: 0,
            borderWidth: 5,
            pointHoverRadius: 8,
            pointHitRadius: 50,
            tension: .3
          },
          {
            type: CHART_TYPE,
            label: 'Proper-Price',
            data: properPrice,
            borderColor: '#0388fc',
            pointRadius: 0,
            borderWidth: 5,
            tension: .3,
            pointHoverRadius: 8,
            pointHitRadius: 50,        
          },
          {
            type: CHART_TYPE,
            label: stock.data.name,            
            data: stockData,
            borderWidth: 5,
            fill: true,
            tension: .3,
            borderColor: '#1DE9B6',
            backgroundColor: '#1DE9B615',
            pointRadius: 0,
            pointHoverRadius: 8,
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
