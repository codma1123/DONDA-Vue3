<template>

  <v-divider />

  <div>
    <IndicatorInfo 
      v-for="statementContent in statementContents"
      :key="statementContent.type"
      :labels="labels"
      :propId="statementContent.type"
      :title="statementContent.type"
      :chartData="statementContent.chartData"
    >
      <template #chip>
        <IndicatorChip :chipType="statementContent.chipType" />
        <IndicatorChip :chipType="statementContent.chipFluctuation" />
      </template>
      <template #description>
        
      </template>
    </IndicatorInfo>
     
  </div>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, onMounted, ref } from 'vue'
  import _ from 'lodash'
  import * as utils from '@/utils'  
  import { useCustomRouter } from '@/mixins/customRouter';
  import IndicatorInfo from '../indicator/IndicatorInfo.vue';
  import IndicatorChip, { ChipType } from '../indicator/IndicatorChip';
  import { getTrend } from '@/utils';

  type StatementTypes = 'type' |
    'asset' |
    'cash' |
    'current_asset' |
    'ebitda' |
    'equity' |
    'equity_non' |
    'gross_margin' |
    'liability' |
    'profit' |
    'profit_non' |
    'revenue'

  type StatementContents = {
    type: StatementTypes | string
    chartData: number[]
    expand: boolean
    chipType: ChipType
    chipFluctuation: ChipType
  }

  const banish = ['equity_non', 'profit_non']


  const { statement, stock } = useStockStore()

  const loading = computed(() => !statement.loading && !stock.loading && !_.isEmpty(statement.data))
  const labels = computed<string[]>(() => [...statement.data.date.reverse()])
  const expands = ref<boolean[]>([])

  const statementContents = computed<StatementContents[]>(() => {
    const keys = Object.keys(statement.data.data[0]).slice(1) as StatementTypes[]
    const removedKeys = keys.filter(key => !banish.includes(key))

    expands.value = keys.map(_ => false)

    return removedKeys.map((key: StatementTypes): StatementContents => {
      const chartData = [...statement.data.data.map(v => v[key] as number).reverse()]
      return {
        type: utils.toPascalCase(key),
        chartData,
        expand: false,
        chipType: '분기',
        chipFluctuation: getTrend(chartData)
      }
    })

  })



</script>

<style scoped>
.CardLayout {
  border-radius: 5px;
}

.ChartLayout {
  
}

</style>