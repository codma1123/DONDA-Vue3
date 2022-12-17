<template>
  <v-card
    class="CardLayout"
    color="cardlayout"
    elevation="0"
    @dblclick="resetZoom"
  >  
    <canvas id="closeChart"></canvas>
  </v-card>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../../models/stock';
  import { priceCompactFormatter, priceFormatter } from '../../../mixins/tools';
  import { useStockStore } from '../../../store/stock';
  import { myCrossHair } from '../../../plugins/chart';

  const volueTranslateValue = 40



  const { stockVolume } = useStockStore()
  const { chartData } = defineProps<{ chartData: GraphAllType}>()

  const count = ref<number>(20)
  const chart = ref<Chart>()


  const labels = computed<string[]>(() => Object.keys(chartData))
  const data = computed<number[]>(() => Object.values(chartData))
  const volumeData = computed(() => Object.values(stockVolume.data))

  const options = {
    responsive: true,
    stacked: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {
      legend: { 
        
      },

      tooltip: {
        intersect: true,
        mode: 'index',
        backgroundColor: '#black',
        titleAlign: 'center',
        bodyAlign: 'center',
        bodySpacing: 5,
        padding: 10,
        cornerRadius: 15,
        bodyFont: { size: 12 },
        boxPadding: 5,
        callbacks: {                              
          label: (ctx: any) => {
            const line = '₩' + ctx.formattedValue
            const bar = ctx.formattedValue
            return ctx.datasetIndex ? bar : line
          }
        }
      },


      myCrossHair: true,

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
        type: 'linear',
        position: 'left',
        beginAtZero: false,
        grid: { display: false },
        ticks: {
          maxTicksLimit: 7,
          color: '#1DE9B6',
          callback: (t: number) => priceCompactFormatter.format(t),          
        }
      },

      y1: {
        type: 'linear',
        beginAtZero: false,
        position: 'right',
        ticks: {
          callback: (t: any) => priceCompactFormatter.format(t).slice(1)
        },

        grid: {
          drawOnChartArea: false
        }
      }
    }
    
  } as any


  // hooks
  
  const renderChart = () => {    
    const ctx = document.getElementById('closeChart') as HTMLCanvasElement    
    chart.value?.destroy()
    chart.value = new Chart(ctx, {      
      data: { 
        labels: labels.value,
        datasets: [
          {
            type: 'line',
            label: '종가',
            data: data.value,
            pointRadius: 0,
            tension: 0.3,
            borderColor: '#1DE9B6',
            backgroundColor: '#fff',
            pointHitRadius: 50,
            yAxisID: 'y'
          },
          {
            type: 'bar',
            label: '거래량',
            data: volumeData.value,
            borderColor: 'rgb(201, 203, 207)',
            backgroundColor: 'rgba(201, 203, 207, 0.2)',
            yAxisID: 'y1'
          }
        ]
      },
      options,
      plugins: [myCrossHair]
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