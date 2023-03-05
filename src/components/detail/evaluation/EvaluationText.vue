<template>

  <transition name="fade" :duration="props.delay">
    <v-card 
      v-if="!animationLoading"
      class="CardLayout"
      color="cardlayout"
      elevation="0"
    >
      <v-card-title class="innerTitle">
        {{ evaluation.value }}% {{ evaluation.text }}되었습니다.
        <div class="innerMore">
          저평가?
        </div>
      </v-card-title>      
    </v-card>
  </transition>
</template>

<script setup lang="ts">
import { useStockStore } from '@/store/stock';
import { computed, onMounted, ref } from 'vue';

  interface EvaluationTextProp {
    delay: number
  }

  const props = withDefaults(defineProps<EvaluationTextProp>(), { delay: 2000 })

  const { stock, stockEvaluation } = useStockStore()
  const animationLoading = ref<boolean>(true)

  const evaluation = computed(() => {
    const close = stock.data.close
    const evaluationClose = stockEvaluation.data['S-rim'].at(-1) as number
    const highVal = close > evaluationClose

    return {
      text: highVal ? '고평가' : '저평가',
      textClass: highVal ? 'blue-text' : 'red-text',
      value: (Math.abs((close - evaluationClose) /  evaluationClose * 100)).toFixed(1)
    }
  })

  onMounted(() => {
    setTimeout(() => {
      animationLoading.value = false
    }, props.delay)
  })
   

</script>

<style scoped lang="scss">
.CardLayout {
  margin-top: 20px !important;
}

.innerTitle {
  padding-top: 10px;
}

.innerMore {
  font-size: 13px;
}
.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .35s;        
  }
}
</style>