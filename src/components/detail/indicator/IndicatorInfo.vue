<script setup lang="ts">
  import IndicatorSingleChart from '@/components/detail/indicator/IndicatorSingleChart.vue'
  import { computed, ref } from 'vue';

  interface IndicatorInfoProp {
    propId: string
    labels: string[]
    chartData: number[]
    sectorData?: number[]
    title: string
  }

  const { propId, labels, chartData, sectorData, title } = defineProps<IndicatorInfoProp>()

  const toggle = ref<boolean>(false)
  const actionsText = computed<string>(() => toggle.value ? '접기' : '더보기')
  const actionsIcon = computed<string>(() => toggle.value ? 'mdi-chevron-up' : 'mdi-chevron-down')
  
</script>

<template>
  <v-card 
    class="IndicatorInfoLayout"
    elevation="0"     
  >
    <v-card-title 
      class="font-weight-bold"
      v-font-size="40" 
    >
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
    
    <v-card-actions class="actions">
      <v-btn 
        class="toggleBtn"
        variant="text" 
        @click="toggle = !toggle"
      >
        {{ actionsText }}
        <v-icon>{{ actionsIcon }}</v-icon>        
      </v-btn>      
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
  .IndicatorInfoLayout {
    margin-bottom: 30px;
    opacity: 1;    
    transition: height .5s ease-in;
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
    display: flex;
    flex-direction: row-reverse;
  }

  .toggleBtn {
    &:hover {
      color: white;
    }
  }
</style>