<template>
  <canvas :id="props.id" class="marketSmallChart"></canvas>
</template>

<script setup lang="ts">
import { createChartInstance } from '@/mixins/chartTools';
import { MarketValues } from '@/models/stock';
import { Chart } from 'chart.js';
import { computed, onMounted, ref, watch } from 'vue';


interface MarketSmallChartProp {
  id: string
  chartData: MarketValues
  duration: number
}

const props = defineProps<MarketSmallChartProp>()

const DURATION = [7, 14, 28]

const chart = ref<Chart | null>()

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },

  plugins: {
    legend: { display: false },
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
  },

  scales: {
    x: {       
      grid: { display: false },
      ticks: { display: false }
     },
    y: { 
      border: { display: false},
      grid: { display: false },
      ticks: { display: false }
    },    
  },

  animation: {}

} as any

const ctx = computed<HTMLElement | null>(() => document.getElementById(props.id))

const config = computed(() => ({
  data: {
    labels: props.chartData.labels.slice(-1 * DURATION[props.duration]),
    datasets: [{
      type: 'line',
      data: props.chartData.values.map(value => Math.ceil(value.close)).slice(-1 * DURATION[props.duration]),
      tension: 0.3,
      borderWidth: 1,
      pointRadius: 0,
      pointHitRadius: 4
    }]
  },
  options
}))

watch(props, () => {
  chart.value?.clear()
  chart.value?.destroy()
  renderChart()
})

const renderChart = () => chart.value = createChartInstance(ctx.value, config.value)

onMounted(() => renderChart())

</script>
<style>
.marketSmallChart {
  width: 190px !important;
}
</style>