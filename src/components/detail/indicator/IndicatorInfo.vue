<template>
  <v-card 
    class="IndicatorInfoLayout"
    @click="expandCallback"
    :hieght="cardHeight"
  >
    <v-card-title v-font-size="40" class="font-weight-bold">
      {{ propId }}
    </v-card-title>
    <v-card-text class="description">
      <slot></slot>
    </v-card-text>
    <v-card-text>
      <IndicatorSingleChart 
        :propId="propId"
        :title="title"
        :labels="labels"
        :chartData="chartData"
        :sectorData="sectorData"
      />  
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import IndicatorSingleChart from '@/components/detail/indicator/IndicatorSingleChart.vue'
  import useDebugger from '@/mixins/dubbger';
  import { ref, watch, computed } from 'vue';

  interface IndicatorInfoProp {
    propId: string
    labels: string[]
    chartData: number[]
    sectorData: number[]
    title: string
  }

  const { logWatch } = useDebugger()

  const { propId, labels, chartData, sectorData, title } = defineProps<IndicatorInfoProp>()

  const expandEnable = ref<boolean>(false)

  const cardHeight = computed<number>(() => expandEnable ? 660 : 400)

  const expandCallback = () => expandEnable.value = !expandEnable.value
  
  watch(expandEnable, logWatch<boolean>)

</script>

<style lang="scss" scoped>
  .IndicatorInfoLayout {
    margin-bottom: 50px;
  }

  .description {
    font-size: 1.25rem;
    opacity: .8;
    margin-left: 2rem;

  }

  .IndicatorInfoLayout {
    transition: .5s ease-in-out;
  }


</style>