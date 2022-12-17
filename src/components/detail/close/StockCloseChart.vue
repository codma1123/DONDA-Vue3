<template>
  <v-card
    class="CardLayout"    
    elevation="0"
    @dblclick="resetZoom"
    v-if="loading"
  >  
    <canvas id="closeChart"></canvas>

    <v-card-actions class="d-flex flex-column align-start" v-font-size="12">
      <span class="informationArea">
        <v-icon>mdi-information</v-icon> 
        <span> 마우스 휠을 사용해 차트를 축소/확대 할 수 있습니다. (PC)</span>
      </span>      
      <span class="informationArea">
        <v-icon>mdi-information</v-icon> 
        <span> 화면을 끌어 차트를 이동시킬 수 있습니다</span>
      </span>      
      <span class="informationArea">
        <v-icon>mdi-information</v-icon> 
        <span> 두번 탭하여 차트를 초기화 시킬 수 있습니다.</span>
      </span>          
    </v-card-actions>

  </v-card>
  <v-divider />
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '../../../models/stock';
  import { priceCompactFormatter } from '../../../mixins/tools';
  import { useStockStore } from '../../../store/stock';
  import { myCrossHair } from '../../../plugins/chart';


  const { stockVolume, stock, stockGraphAll } = useStockStore()
  const { chartData } = defineProps<{ chartData: GraphAllType}>()

  const count = ref<number>(20)
  const chart = ref<Chart>()


  const labels = computed<string[]>(() => Object.keys(chartData))
  const data = computed<number[]>(() => Object.values(chartData))
  const volumeData = computed(() => Object.values(stockVolume.data))
  const loading = computed<boolean>(() => !stock.loading && !stockGraphAll.loading)

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

.informationArea {
  display: flex;
  align-items: center;
  span {
    margin-left: .25rem;
    opacity: .6;
  }
  margin-top: 5px;
}


</style>