<template>
  <v-card class="IndicatorInfoLayout">
    <IndicatorSingleChart 
      :propId="propId"
      :title="title"
      :labels="labels"
      :chartData="chartData"
      :sectorData="sectorData"
    />  
  </v-card>
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