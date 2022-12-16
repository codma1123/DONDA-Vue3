<template>
  <v-card
    class="CardLayout"
    color="cardlayout"
    elevation="2"
    @dblclick="resetZoom"
  >
    <div class="d-flex justify-end">
      <v-btn 
        prepend-icon="mdi-chart-box-plus-outline"
        size="small"
        class="OptionBtns"
        :variant="volumeSelect ? 'text' : 'outlined'"
        v-model="volumeSelect"
        @click="volumeSelect = !volumeSelect"
      >
        거래량
      </v-btn>      
    </div>
    <canvas id="closeChart"></canvas>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../../models/stock';
  import { priceCompactFormatter } from '../../../mixins/tools';

  const { chartData } = defineProps<{ chartData: GraphAllType}>()
  const count = ref<number>(20)
  const chart = ref<Chart>()
  const volumeSelect = ref<boolean>(false)

  const labels = computed<string[]>(() => Object.keys(chartData))
  const data = computed<number[]>(() => Object.values(chartData))
  const datasets = computed(() => volumeSelect ? [data.value] : [data.value])

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



  // watch
  watch(volumeSelect, (newVal: boolean) => {
    if (!newVal) return
    chart.value?.destroy()
    renderChart()
  })

  // hooks
  
  const renderChart = () => {    
    const ctx = document.getElementById('closeChart') as HTMLCanvasElement    
    
    chart.value = new Chart(ctx, {      
      data: { 
        labels: labels.value,
        datasets: [
          { 
            type: 'line',
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

.OptionBtns {
  transition: all .3s ease-in;
}
</style>