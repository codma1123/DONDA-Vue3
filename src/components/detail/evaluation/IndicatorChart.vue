<template>
    <canvas id="indiactorChart"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart } from 'chart.js'
import { createChartInstance } from '@/mixins/chartTools';

interface IndicatorChartProp {
    chartData: {
        label: string[]
        data: number[] | string[]
    }
}
 
const props = defineProps<IndicatorChartProp>()

const chart = ref<Chart | null>(null)

const options = {
     
} as any


const renderChart = (): void  => {

    const ctx = document.getElementById('indiactorChart')

    if (!(ctx instanceof HTMLCanvasElement)) return        
}

onMounted(() => renderChart())


</script>