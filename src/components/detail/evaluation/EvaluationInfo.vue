<template>
  <v-divider />

  <v-card class="" elevation="0">

    <v-sheet class="EvaluationChartSheet">      
      {{ evaluation.value }}% 
      <div :class="evaluation.textClass" v-font-size="40">
        {{ evaluation.text  }}
      </div>
    </v-sheet>

    <div class="date"> 기준일 : {{ date }}</div>

    <v-card-subtitle class="mt-2 closeIcon" @click="push(`/detail/${stock.data.code}/close`)">
      현재 주가 <v-icon>mdi-information</v-icon>
    </v-card-subtitle>
    <v-card-text v-font-size="35">
      <number 
        :from="0"
        :to="stockClose"
        :format="priceFormat"
        :duration="1.2"
        :delay="0"
        easing="Power4.easeOut"
      />
    </v-card-text>

    <v-card-subtitle class="mt-5">
      적정 주가      
    </v-card-subtitle>
    <v-card-text v-font-size="35">
      <number 
        :from="0"
        :to="evaluationClose"
        :format="priceFormat"
        :duration="1.4"
        :delay="0"
        easing="Power4.easeOut"
      />
    </v-card-text>

  </v-card>
</template>

<script setup lang="ts">
  import { priceCompactFormatter, priceFormatter } from '@/mixins/tools';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import { useRouter } from 'vue-router';


  const { stock, stockEvaluation } = useStockStore()
  const router = useRouter()

  const stockClose = computed(() => stock.data.close)
  const date = computed(() => stock.data.date)
  const evaluationClose = computed(() => stockEvaluation.data['S-rim'].at(-1) as number)

  const evaluation = computed(() => {
    const close = stock.data.close
    const evaluationClose = stockEvaluation.data['S-rim'].at(-1) as number
    const highVal = close > evaluationClose

    return {
      text: highVal ? '고평가' : '저평가',
      textClass: highVal ? 'text-blue' : 'text-red',
      value: (Math.abs((close - evaluationClose) /  evaluationClose * 100)).toFixed(1)
    }
  })

  
  const push = (link: string) => router.push(link)
  const priceFormat = (price: number) => '₩' + Number(price.toFixed(0)).toLocaleString()
  
</script>

<style scoped lang="scss">
.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
}

.EvaluationChartSheet {
  position: absolute;
  right: 5px;
  top: 40px;
  width: 200px;
  gap: 3rem;
  height: 110px;
  font-size: 30px;
  text-align: center;  
  font-weight: bold;
}

.informationArea {
  display: flex;
  align-items: start;
  span {
    margin-left: .25rem;
    opacity: .6;
  }
  margin-top: 5px;
}

.closeIcon {
  cursor: pointer;
  transition: all .3s ease;
  &:hover {
    opacity: 1 !important;
  }
}


</style>