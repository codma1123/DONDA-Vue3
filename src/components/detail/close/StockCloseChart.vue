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
  import { computed, onMounted, ref } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../../models/stock';
  import { priceCompactFormatter } from '../../../mixins/tools';

  const { chartData } = defineProps<{ chartData: GraphAllType}>()
  const count = ref<number>(20)
  const chart = ref<Chart>()

  const labels = computed<string[]>(() => Object.keys(chartData))
  const data = computed<number[]>(() => Object.values(chartData))

  const options = {
    responsive: true,

    plugins: {
      legend: { display: false },

      zoom: {        
        pan: {
          enabled: true,
          mode: 'x',
        },
        
        zoom: {          
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x'
        }
      }
    },

    scales: {
      x: {                 
        grid: { display: false },
        min: labels.value.at(count.value * (-1)),
        ticks: {
          maxTicksLimit: 4,
          minTicksLimit: 4,
          maxRotation: 0,
          color: 'white',
          align: 'start',
          crossAlign: 'center',          
        }
      },
      y: { 
        grid: { display: false },
        ticks: {
          maxTicksLimit: 7,
          color: 'white',
          callback: (t: number) => priceCompactFormatter.format(t),          
        }
      }
    }
    
  } as any
  
  const renderChart = () => {    
    const ctx = document.getElementById('closeChart') as HTMLCanvasElement
    
    chart.value = new Chart(ctx, {
      type: 'line',
      data: { 
        labels: labels.value,
        datasets: [
          { 
            label: '',
            data: data.value,
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