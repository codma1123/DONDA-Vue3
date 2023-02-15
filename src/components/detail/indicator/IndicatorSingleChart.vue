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
  const delayed = ref<boolean>()

  const options = {

    plugins: {
      tooltip: {
        intersect: true,
        mode: 'index',
        backgroundColor: '#black',
        titleAlign: 'center',
        bodyAlign: 'right',
        bodySpacing: 5,
        padding: 10,
        cornerRadius: 15,        
        bodyFont: { size: 12 },
        boxPadding: 5,
      }
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: 'white',
          font: { size: 15 }
        }
      },

      y: { display: false }
    },

    
    animation: {
      onComplete: () => delayed.value = true,

      delay: (context: any) => {
        let delay = 0
        if (context.type === 'data' && context.mode === 'default' && !delayed.value) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100
        }

        return delay
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
