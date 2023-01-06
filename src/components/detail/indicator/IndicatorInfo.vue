<template>
  <v-sheet class="IndicatorInfoLayout">
    <v-card-title v-font-size="40" class="font-weight-bold">
      {{ propId }}
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

  const { propId, labels, chartData, sectorData, title } = defineProps<{ 
    propId: string
    labels: string[]
    chartData: number[]
    sectorData: number[]
    title: string
   }>()

</script>

<style scoped lang="scss">
.IndicatorInfoLayout {
  
}


</style>