<template>

  <v-divider />

  <div v-if="loading">
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
        {{ statementContent.description }}
      </template>
    </IndicatorInfo>
  </div>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import _ from 'lodash'
  import * as utils from '@/utils'  
  import IndicatorInfo from '../indicator/IndicatorInfo.vue';
  import IndicatorChip, { ChipType } from '../indicator/IndicatorChip';
  import { getTrend } from '@/utils';
  import { StockStatementElement } from '@/api/types';

  type BanishType = 'equity_non' | 'profit_non' | 'type' | 'cash'

  type StatementInfoType = Omit<StockStatementElement, BanishType>

  type StatementContents = {
    type: string
    chartData: number[]
    expand: boolean
    chipType: ChipType
    chipFluctuation: ChipType
    description: string
  }

  const statementDescriptionMap: { [k in keyof StatementInfoType | string]: string} = {
    asset: '현금, 매출채권, 제품, 공장 등 기업이 보유하고 있는 모든 자산입니다. 일반적으로 많으면 많을수록 좋습니다.',
    current_asset: '기업이 바로 현금으로 사용 가능한 자산을 의미합니다. 일반적으로 많으면 많을수록 좋습니다.',
    ebitda: '순수하게 영업을 통해 벌어들인 이익을 뜻합니다. 일반적으로 많으면 많을수록 좋습니다.',
    equity: '사업주 회사에 주주들이 스스로 납입한 자본입니다. 실질적으로 주주들에게 떨어지는 금액입니다.',
    gross_margin: '매출에서 매출 원가를 뺀 값으로, 이익이라고 생각되는 모든 것이 매출총이익이 됩니다. 일반적으로 많으면 많을수록 좋습니다.',
    liability: '기업이 가지고있는 빚의 총합을 말합니다. 일반적으로 적으면 적을수록 좋습니다.',
    profit: '일정기간동안의 기업의 순이익을 뜻합니다. 일반적으로 많으면 많을수록 좋습니다.',
    revenue: '기업이 영업활동을 통해 얻은 총 수익을 뜻합니다. 일반적으로 많으면 많을수록 좋습니다.'
  }

  const { statement, stock } = useStockStore()
  
  const loading = computed<boolean>(() => !statement.loading && !stock.loading && !_.isEmpty(statement.data))

  const labels = computed<string[]>(() => [...statement.data.date.reverse()])

  const statementContents = computed<StatementContents[]>(() =>     
    (Object.keys(statementDescriptionMap))
      .map((key: string) => {      
        const chartData = [...statement.data.data.map(v => v[key as keyof StatementInfoType]).reverse()]
        return {
          type: utils.toPascalCase(key),
          chartData,
          expand: false,
          chipType: '분기',
          chipFluctuation: getTrend(chartData),
          description: statementDescriptionMap[key]
        }
      })
  )

</script>