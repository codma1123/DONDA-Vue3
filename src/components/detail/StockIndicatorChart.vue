<template>
  <canvas id="indicatorChart"></canvas>  
</template>

<script setup lang="ts">

  import { Chart } from 'chart.js'
  import { onMounted, computed, ref } from 'vue'
  import { useStockStore } from '../../store/stock';

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },

    grid: {
      x: {
        display: false
      }
    },

    scales: {
      x: {
        grid: {
          display: false
        },

        border: {
          display: false
        }
      },

      y: {
        grid: {
          display: false
        },

        border: {
          display: false
        }
      }
    },

    animation: {      
      easing: 'easeInOutCubic',
      duration: 2000
    },
  } as any

  const { indicator } = useStockStore()
  const labels = computed(() => indicator.data?.eps.date)  
  const chart = ref<Chart>()

  const renderChart = () => { 
    const ctx = document.getElementById('indicatorChart') as HTMLCanvasElement

    chart.value = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels.value,
        datasets: [{

          data: [1, 2, 3, 4]
        }]
      },
      options
    })    
  }

  onMounted(() => renderChart())

</script>

<style scoped>

</style>