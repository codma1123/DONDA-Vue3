<template>
  <v-sheet class="IndicatorInfoLayout">
    <v-card-title v-font-size="40" class="font-weight-bold">
      {{ propId }}
      <span class="ml-1">
        <slot name="chip">
        </slot>    
      </span>
    </v-card-title>
    
    <v-card-text>
      <IndicatorSingleChart 
        :propId="propId"
        :title="title"
        :labels="labels"
        :chartData="chartData"
        :sectorData="sectorData"
      />  
    </v-card-text>
  </v-sheet>
</template>

<script setup lang="ts">
  import IndicatorSingleChart from '@/components/detail/indicator/IndicatorSingleChart.vue'

  interface IndicatorInfoProp {
    propId: string
    labels: string[]
    chartData: number[]
    sectorData: number[]
    title: string
  }

  const { propId, labels, chartData, sectorData, title } = defineProps<IndicatorInfoProp>()
  

</script>

<style lang="scss" scoped>
  .IndicatorInfoLayout {
    margin-bottom: 50px;
  }
</style>