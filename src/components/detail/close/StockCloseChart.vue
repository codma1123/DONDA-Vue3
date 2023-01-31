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
  import { computed, onMounted, ref, onUnmounted, onBeforeUnmount } from 'vue';
  import { Chart } from 'chart.js'
  import { GraphAllType } from '@/models/stock';
  import { priceCompactFormatter } from '@/mixins/tools';
  import { useStockStore } from '@/store/stock';
  import { createChartInstance, myCrossHair } from '@/mixins/chartTools';

  // Custom Hooks
  const { stockVolume, stock, stockGraphAll } = useStockStore()


  // Props
  const { chartData } = defineProps<{ chartData: GraphAllType}>()


  // Computed Values
  const count = ref<number>(7)
  const chart = ref<Chart | null>()

  const labels = computed(() => Object.keys(chartData))
  const data = computed(() => Object.values(chartData))
  const volumeData = computed(() => Object.values(stockVolume.data))
  const loading = computed(() => !stock.loading && !stockGraphAll.loading)

  const options = {
    responsive: true,
    stacked: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },

    plugins: {      
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
        callbacks: { label: (ctx: any) => ctx.datasetIndex === 0 ? '₩' + ctx.formattedValue : ctx.formattedValue }
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
        ticks: { callback: (t: any) => priceCompactFormatter.format(t).slice(1) },
        grid: { drawOnChartArea: false }
      }
    },

    animation: {
      duration: 1000
    }
  } as any

  const ctx = computed<HTMLElement | null>(() => document.getElementById('closeChart'))
  const config = computed(() => ({
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
          yAxisID: 'y',
          order: 1
        },
        {
          type: 'bar',
          label: '거래량',
          data: volumeData.value,
          borderColor: 'rgb(201, 203, 207)',
          backgroundColor: 'rgba(201, 203, 207, 0.2)',
          yAxisID: 'y1',
          order: 2
        }
      ]
    },
    options,
    plugins: [myCrossHair]
  }))


  // Hooks
  const renderChart = () => chart.value = createChartInstance(ctx.value, config.value)  
  const resetZoom = () => chart.value?.resetZoom()
  
  onMounted(() => renderChart())
  onBeforeUnmount(() => chart.value?.options.plugins as undefined)
  
  
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