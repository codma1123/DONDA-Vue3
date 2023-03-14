<template>
  <v-card 
    class="IndicatorInfoLayout"
    elevation="0" 
    @click="toggle = !toggle"
  >
    <v-card-title v-font-size="40" class="font-weight-bold">
      {{ propId }}
      <slot name="chip"></slot>    
    </v-card-title>

    <div class="subtitle">
      <slot name="description"></slot>
    </div>
    
    <v-card-text v-if="toggle">
      <IndicatorSingleChart 
        :propId="propId"
        :title="title"
        :labels="labels"
        :chartData="chartData"
        :sectorData="sectorData"
      />  
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse actions">
      <v-icon>{{ actionsIcon }}</v-icon>
      {{ actionsText }}
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
  import IndicatorSingleChart from '@/components/detail/indicator/IndicatorSingleChart.vue'
  import { computed, ref } from 'vue';

  interface IndicatorInfoProp {
    propId: string
    labels: string[]
    chartData: number[]
    sectorData: number[]
    title: string
  }

  const { propId, labels, chartData, sectorData, title } = defineProps<IndicatorInfoProp>()

  const toggle = ref<boolean>(false)
  const actionsText = computed<string>(() => toggle.value ? '접기' : '더보기')
  const actionsIcon = computed<string>(() => toggle.value ? 'mdi-chevron-up' : 'mdi-chevron-down')
  
</script>

<style lang="scss" scoped>
  .IndicatorInfoLayout {
    margin-bottom: 30px;
    opacity: 1;

    &:hover {
      background-color: #333333;
    }
  }

  .subtitle {
    margin-top: 0.75rem;
    margin-left: 1.25rem;
    font-size: 15px;
    opacity: .65;
  }

  .actions {
    font-size: 12px;
    opacity: .5;
  }
</style>