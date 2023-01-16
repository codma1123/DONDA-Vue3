<template>
  <canvas id="indicatorChart"></canvas>  
</template>

<script setup lang="ts">

  import { Chart, ChartConfiguration, ChartConfigurationCustomTypesPerDataset } from 'chart.js'
  import { onMounted, computed, ref } from 'vue'
  import { useStockStore } from '@/store/stock';
  import { createChartInstance } from '@/mixins/chartTools';

  const options = computed(() => ({
    responsive: true,

    plugins: {      
      tooltip: { enabled: false },      
      
      legend: {
        labels: { color: '#fff' }
      }
    },

    grid: {
      x: { display: false }
    },


    scales: {
      x: {
        grid: { display: false },
        border: { display: false },        
        ticks: { color: '#fff' }        
      },

      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false }
      },

      r: {
        ticks: { display: false },
        max: Math.max(...sectorData.value),        
        pointLabels: {
          fontSize: 20,
          color: '#fff'
        }
      }
    },

    animation: {      
      easing: 'easeInOutCubic',
      duration: 2000
    },
  }))


  const { indicator, indicatorDaily, indicatorSector, indicatorSectorDaily, stock } = useStockStore()
  const labels = ['EPS', 'BPS', 'ROE']
  const chart = ref<Chart | null>()

  const indicatorChartData = computed(() => indicator.data)
  const indicatorSectorChartData = computed(() => indicatorSector.data)

  const currentData = computed(() => [
    (indicatorChartData.value.eps.value.at(-1) as number) / 20,
    (indicatorChartData.value.bps.value.at(-1) as number) / 350,
    (indicatorChartData.value.roe.value.at(-1) as number) + 100,
    // (indicatorDailyChartData.value.per.value.at(-1) as number) + 50,
    // (indicatorDailyChartData.value.pbr.value.at(-1) as number) + 50,
    // (indicatorDailyChartData.value.psr.value.at(-1) as number) + 50,
  ])

  const sectorData = computed(() => [
    (indicatorSectorChartData.value.sector_eps.at(-1) as number) / 20,
    (indicatorSectorChartData.value.sector_bps.at(-1) as number) / 350,
    (indicatorSectorChartData.value.sector_roe.at(-1) as number) + 50,
    // (indicatorSectorDailyChartData.value.per.value.at(-1) as number) + 50,
    // (indicatorSectorDailyChartData.value.pbr.value.at(-1) as number) + 50,
    // (indicatorSectorDailyChartData.value.psr.value.at(-1) as number) + 50,
  ])

  const ctx = computed<HTMLElement | null>(() => document.getElementById('indicatorChart'))
  const config = computed(() => ({
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: stock.data.name,
          data: currentData.value,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.9)',
          borderSkipped: false,
          borderRadius: 3
        },
        {
          label: '섹터 평균',
          data: sectorData.value,
          backgroundColor: 'rgba(54, 162, 235, 0.9)',
          borderColor: 'rgb(54, 162, 235)',
          borderSkipped: false,
          borderRadius: 3.                    
        }
      ]
    },
    options: options.value
  }))

  const renderChart = () => chart.value = createChartInstance(ctx.value, config.value)
  

  onMounted(() => renderChart())

</script>

<style scoped>
#indicatorChart {
  height: 250px; 
  max-width: 300px;
  overflow: hidden;
}
</style>