<template>
  <v-card
    class="CardLayout"
    color="cardlayout"
    elevation="2"
    @dblclick="resetZoom"
  >
    <canvas id="closeChart"></canvas>
  </v-card>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../../models/stock';
  import { priceCompactFormatter } from '../../../mixins/tools';

  const { chartData } = defineProps<{ chartData: GraphAllType}>()
  const count = ref<number>(20)
  const chart = ref<Chart>()
  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false
      },

      zoom: {        
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {          
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        }
      }
    },

    scales: {
      x: {                 
        grid: { display: false },
        ticks: {
          maxTicksLimit: 7,
          maxRotation: 0,
          color: 'white',
        }
      },
      y: { 
        grid: { display: false },
        ticks: {
          maxTicksLimit: 7,
          color: 'white',
          callback: (t: number) => priceCompactFormatter.format(t)          
        }
      }
    }
    
  } as any
  
  const renderChart = () => {    
    const ctx = document.getElementById('closeChart') as HTMLCanvasElement

    const labels = Object.keys(chartData).map(label => label.slice(5))
    const data = Object.values(chartData)

    chart.value = new Chart(ctx, {
      type: 'line',
      data: { 
        labels,
        datasets: [
          { 
            label: '',
            data,
            pointRadius: 0,
            tension: 0.3,
            borderColor: '#1DE9B6',            
          }
        ]
      },
      options
    })

  }

  const resetZoom = () => chart.value?.resetZoom()
  
  onMounted(() => renderChart())

  
</script>

<style lang="scss" scoped>
.CardLayout {
  padding: 15px;  
}

#closeChart {
  min-height: 200px;
}
</style>