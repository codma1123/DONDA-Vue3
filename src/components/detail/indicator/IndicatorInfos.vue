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
      <template #description>
        주당순이익(Earnings Per Shares) <br/>
        기업의 순이익을 유통주식수로 나눈 수치를 말합니다. 일반적으로 주당순이익이 높을수록 주가에 좋은 영향을 줍니다.
      </template>


    </IndicatorInfo>
  
    <!-- BPS -->
    <IndicatorInfo 
      propId="BPS"
      :title="title"
      :labels="labels"
      :chartData="bpsChartData"
      :sectorData="bpsSectorData"
    >
      <template #chip>
        <IndicatorChip chipType="분기" />
        <IndicatorChip :chipType="getTrend(bpsChartData)" />
      </template>
      <template #description>
        주당순자산(Bookvalue Per Shares) <br />
        기업의 순자산을 발행한 유통주식수로 나눈 수치를 말합니다. BPS 아래로 주가가 형성되면, 현재 주가가 저평가되었다고 생각할 수 있습니다.
      </template>

    </IndicatorInfo>
  
    <!-- ROE -->
    <IndicatorInfo 
      propId="ROE"
      :title="title"
      :labels="labels"
      :chartData="roeChartData"
      :sectorData="roeSectorData"
    >  
      <template #chip>
        <IndicatorChip chipType="분기" />
        <IndicatorChip :chipType="getTrend(roeChartData)" />
      </template>
      <template #description>
        자기자본이익률(Return On Equity) <br />
        당기 순이익을 평균자기자본으로 나눈 수치를 말합니다. 일반적으로 ROE가 높을수록 투자 수익률을 높힐 수 있습니다.
      </template>
    </IndicatorInfo>
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