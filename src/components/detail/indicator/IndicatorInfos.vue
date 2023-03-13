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
      <template #chip>
        <IndicatorChip chipType="분기" />
        <IndicatorChip :chipType="getTrend(epsChartData)" />
      </template>

    </IndicatorInfo>
  
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
  </div>
  <!-- EPS -->

</template>

<script setup lang="ts">
  import { IndicatorSectorType } from '@/models/stock';
  import { useStockStore } from '@/store/stock'
  import { computed, reactive, ref } from 'vue';
  import IndicatorChip, { ChipType } from './IndicatorChip';
  import IndicatorInfo from './IndicatorInfo.vue'

  const { stock, indicator, indicatorSector, indicatorDaily, indicatorSectorDaily } = useStockStore()
  const labels = computed<string[]>(() => [...indicator.data.eps.date].reverse())
  const title = computed(() => stock.data.name)
  const attrTest = reactive<{ d: string}>({
    d: 'test'
  })

  const epsChartData = computed<number[]>(() => createChartData('eps'))
  const epsSectorData = computed<number[]>(() => createSectorData('sector_eps'))
  const bpsChartData = computed<number[]>(() => createChartData('bps'))
  const bpsSectorData = computed<number[]>(() => createSectorData('sector_bps'))
  const roeChartData = computed<number[]>(() => createChartData('roe'))
  const roeSectorData = computed<number[]>(() => createSectorData('sector_roe'))

  const getTrend = (datas: number[]): ChipType => datas[0] > datas[3] ? '하락' : '상승'

  const createChartData = (indicatorType: string) => [...indicator.data[indicatorType].value].reverse()
  const createSectorData = (indicatorType: keyof IndicatorSectorType) => [...indicatorSector.data[indicatorType]].reverse() as number[]
  
</script>

<style lang="scss">

</style>