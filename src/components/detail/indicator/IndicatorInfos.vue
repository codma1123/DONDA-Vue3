<template>

  <v-divider />

  <!-- EPS -->
  <IndicatorInfo 
    propId="EPS"
    :title="title"
    :labels="labels"
    :chartData="epsChartData"
    :sectorData="epsSectorData"
  />  

  <!-- BPS -->
  <IndicatorInfo 
    propId="BPS"
    :title="title"
    :labels="labels"
    :chartData="bpsChartData"
    :sectorData="bpsSectorData"
  />  

  <!-- ROE -->
  <IndicatorInfo 
    propId="ROE"
    :title="title"
    :labels="labels"
    :chartData="roeChartData"
    :sectorData="roeSectorData"
  />  

</template>

<script setup lang="ts">
  import { IndicatorSectorType } from '@/models/stock';
  import { useStockStore } from '@/store/stock'
  import { computed } from 'vue';
  import IndicatorSingleChart from './IndicatorSingleChart.vue';
  import IndicatorInfo from './IndicatorInfo.vue'

  const { stock, indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const labels = computed<string[]>(() => [...indicator.data.eps.date].reverse())
  const title = computed(() => stock.data.name)

  const epsChartData = computed<number[]>(() => createChartData('eps'))
  const epsSectorData = computed<number[]>(() => createSectorData('sector_eps'))
  const bpsChartData = computed<number[]>(() => createChartData('bps'))
  const bpsSectorData = computed<number[]>(() => createSectorData('sector_bps'))
  const roeChartData = computed<number[]>(() => createChartData('roe'))
  const roeSectorData = computed<number[]>(() => createSectorData('sector_roe'))

  const createChartData = (indicatorType: string) => [...indicator.data[indicatorType].value].reverse()
  const createSectorData = (indicatorType: keyof IndicatorSectorType) => [...indicatorSector.data[indicatorType]].reverse() as number[]
  
</script>

<style scoped lang="scss">

$padding: 5px;

.CardLayout {
  padding: $padding;
  padding-left: 0px;
  padding-top: 0px;
  margin-left: 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .ChartLayout {
    height: 500px;
  }
}
</style>