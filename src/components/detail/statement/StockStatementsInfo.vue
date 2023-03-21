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
  import { computed, ref } from 'vue'
  import _ from 'lodash'
  import * as utils from '@/utils'  
  import IndicatorInfo from '../indicator/IndicatorInfo.vue';
  import IndicatorChip, { ChipType } from '../indicator/IndicatorChip';
  import { getTrend } from '@/utils';
  import { StockStatementElement } from '@/api/types';

  
  type StatementInfoType = Omit<StockStatementElement, 'equity_non' | 'profit_non' | 'type'>

  type StatementContents = {
    type: string
    chartData: number[]
    expand: boolean
    chipType: ChipType
    chipFluctuation: ChipType
    description: string
  }

  const statementDescriptionMap: { [k in keyof StatementInfoType]: any} = {
    'asset': '',
    'cash': '',
    'current_asset': '',
    'ebitda': '',
    'equity': '',
    'gross_margin': '',
    'liability': '',
    'profit': '',
    'revenue': ''
  }

  const { statement, stock } = useStockStore()
  
  const loading = computed(() => !statement.loading && !stock.loading && !_.isEmpty(statement.data))
  const labels = computed<string[]>(() => [...statement.data.date.reverse()])

  const statementContents = computed<StatementContents[]>(() => {    
    return Object.keys(statementDescriptionMap).map((key: string) => {      
      const chartData = [...statement.data.data.map(v => v[key as keyof StatementInfoType] as number).reverse()]
      return {
        type: utils.toPascalCase(key),
        chartData,
        expand: false,
        chipType: '분기',
        chipFluctuation: getTrend(chartData),
        description: statementDescriptionMap[key as keyof StatementInfoType]
      }
    })
  })

</script>