<template>
    <canvas :id="propKey" class="evaluationChart"></canvas>
</template>

<script setup lang="ts">

  import { onMounted, ref, computed, onUnmounted, onBeforeUnmount } from 'vue'
  import { Chart } from 'chart.js'
  import { useStockStore } from '@/store/stock';
  import { priceCompactFormatter } from '@/mixins/tools';
  import { createChartInstance } from '@/mixins/chartTools';

  // Custom Hooks
  const { stockEvaluation, stock } = useStockStore()


  // Prop
  const { propKey } = withDefaults(defineProps<{ propKey?: string }>(), { propKey: 'evaluation' })
    

  // Computed Values
  const chart = ref<Chart | null>()

  const stockChartData = computed<number>(() => stock.data.close)
  const evaluationChartData = computed<number>(() => stockEvaluation.data['S-rim'].at(-1) as number)
  
  const ctx = computed<HTMLElement | null>(() => document.getElementById(propKey))
  const config = computed(() => ({
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
  }))

  const options = {
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },

    scales: {
      x: {
        beginAtZero: false,
        border: { display: false },
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
    },

    animation: {
      duration: 500,
    }
  } as any


  // Hooks
  const renderChart = () => chart.value = createChartInstance(ctx.value, config.value)

  onMounted(() => renderChart())
  onBeforeUnmount(() => chart.value?.options.plugins as undefined)

</script>

<style>
.evaluationChart {
  max-height: 110px;
}
</style>

