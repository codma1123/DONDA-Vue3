<template>
  <canvas class="closeChart"></canvas>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../models/stock';

  const { chartData } = defineProps<{ chartData: GraphAllType}>()
  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  } as any
  
  const renderChart = () => {
    const ctx = document.getElementById('closeChart') as HTMLCanvasElement
    const labels = Object.keys(chartData)
    const data = Object.values(chartData)

    const chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ label: '', data }]},
      options
    })
  }
  
  onMounted(() => renderChart())

  
</script>

<style lang="scss" scoped>

</style>