<template>

  <v-divider />

  <div>
    <IndicatorInfo 
      propId="EPS"
      :title="title"
      :labels="labels"
      :chartData="epsChartData"
      :sectorData="epsSectorData"
    >
     'Earnings Per Share'의 약자로, 기업의 순이익(당기순이익)을 유동주식수로 나눈 수치를 말합니다.
    </IndicatorInfo>  
  
    <!-- BPS -->
    <IndicatorInfo 
      propId="BPS"
      :title="title"
      :labels="labels"
      :chartData="bpsChartData"
      :sectorData="bpsSectorData"
    >
      'Book-value per share'의 약자로, : 주당 순자산가치는 기업의 순자산을 발행 주식수로 나눈 수치를 말합니다.
    </IndicatorInfo>
  
    <!-- ROE -->
    <IndicatorInfo 
      propId="ROE"
      :title="title"
      :labels="labels"
      :chartData="roeChartData"
      :sectorData="roeSectorData"
    >  
      'Return On Equity, ROE'의 약자로, 기업이 자본을 이용하여 얼마만큼의 이익을 냈는지를 나타내는 지표입니다, 당기순이익 값을 자본 값으로 나누어 구한다.
    </IndicatorInfo>
  </div>
  <!-- EPS -->

</template>

<script setup lang="ts">
  import { IndicatorSectorType } from '@/models/stock';
  import { useStockStore } from '@/store/stock'
  import { computed } from 'vue';
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

<style lang="scss">

</style>