<template>

  <v-divider />

  <div>
    <IndicatorInfo 
      v-for="(statementContent, index) in statementContents"
      :key="statementContent.type"
      :labels="labels"
      :propId="statementContent.type"
      :title="statementContent.type"
      :chartData="statementContent.chartData"
    >
    </IndicatorInfo>
     
  </div>

</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed, onMounted, ref } from 'vue'
  import _ from 'lodash'
  import * as utils from '@/utils'
  import StockStatementSimpleChart from '@/components/detail/statement/StockStatementSimpleChart.vue';
  import { useCustomRouter } from '@/mixins/customRouter';
  import IndicatorInfo from '../indicator/IndicatorInfo.vue';

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
    type: StatementTypes | string,
    chartData: number[]
    expand: boolean
  }

  const banish = ['equity_non', 'profit_non']


  const { statement, stock } = useStockStore()
  const { push } = useCustomRouter()

  const loading = computed(() => !statement.loading && !stock.loading && !_.isEmpty(statement.data))
  const labels = computed<string[]>(() => [...statement.data.date.reverse()])
  const expands = ref<boolean[]>([])

  const statementContents = computed<StatementContents[]>(() => {
    const keys = Object.keys(statement.data.data[0]).slice(1) as StatementTypes[]
    const removedKeys = keys.filter(key => !banish.includes(key))

    expands.value = keys.map(_ => false)

    return removedKeys.map((key: StatementTypes): StatementContents => ({
      type: utils.toPascalCase(key),
      chartData: [...statement.data.data.map(v => v[key] as number).reverse()],
      expand: false
    }))

  })



</script>

<style scoped>
.CardLayout {
  border-radius: 5px;
}

.ChartLayout {
  
}

</style>