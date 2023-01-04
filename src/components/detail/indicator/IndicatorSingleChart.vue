<script setup lang="ts">
  import { Chart } from 'chart.js';
  import { onMounted, ref } from 'vue'

  
  const { propId, labels, chartData, sectorData, title } = defineProps<{ 
    propId: string
    labels: string[]
    chartData: number[]
    sectorData: number[]
    title: string
   }>()

  const chart = ref<Chart | null>()

  const options = {
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: 'white',
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
    const ctx = document.getElementById(propId) as HTMLCanvasElement

    chart.value = new Chart(ctx , {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: chartData
          },
          {
            label: '섹터',
            data: sectorData
          }
        ]
      },
      options
    })
  }

  onMounted(() => renderChart())

</script>

<template>
  <canvas :id="propId"></canvas>
</template>
