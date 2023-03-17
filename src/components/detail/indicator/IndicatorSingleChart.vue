<script setup lang="ts">
  import { Chart } from 'chart.js';
  import { onMounted, ref } from 'vue'
  
  const { propId, labels, chartData, sectorData, title } = defineProps<{ 
    propId: string
    labels: string[]
    chartData: number[]
    sectorData?: number[]
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

  const renderChart = () => {
    const ctx = document.getElementById(propId) as HTMLCanvasElement

    const datasets = [{
      label: title,
      data: chartData,
      borderWidth: 2,
    }]

    if(sectorData) datasets.push({
      label: '섹터평균',
      data: sectorData,
      borderWidth: 2
    })

    chart.value = new Chart(ctx , {
      type: 'bar',
      data: {
        labels,
        datasets
      },
      options
    })


  }

  onMounted(() => renderChart())

</script>

<template>
  <canvas :id="propId"></canvas>
</template>
