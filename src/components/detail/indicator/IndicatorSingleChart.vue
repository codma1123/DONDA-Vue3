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

  // label: 'Fully Rounded',
  // data: Utils.numbers(NUMBER_CFG),
  // borderColor: Utils.CHART_COLORS.red,
  // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
  // borderWidth: 2,
  // borderRadius: Number.MAX_VALUE,
  // borderSkipped: false,


  const renderChart = () => {
    const ctx = document.getElementById(propId) as HTMLCanvasElement

    chart.value = new Chart(ctx , {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: title,
            data: chartData,
            borderWidth: 3
          },
          {
            label: '섹터',
            data: sectorData,
            borderWidth: 3
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
