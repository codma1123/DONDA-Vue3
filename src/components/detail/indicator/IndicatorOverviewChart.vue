<script setup lang="ts">
  
  import { onMounted, ref } from 'vue';
  import { Chart } from 'chart.js' 

  const chart = ref<Chart | null>()

  const options = {} as any

  const renderChart = () => {
    const ctx = document.getElementById('IndicatorOverviewChart') as HTMLCanvasElement

    chart.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: []
        }]
      },
      options
    }) 
  }

  onMounted(() => renderChart())

</script>



<template>
  <canvas id="IndicatorOverviewChart"></canvas>
</template>