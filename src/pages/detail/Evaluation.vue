<template>
  <div class="DetailLayout" v-if="loading">

    <!-- Title -->
    <StockTitle />

    <StockEvaluationInfo 
      :close="close"
      :evaluationClose="evaluationClose"
      />

    <StockEvaluationText 
      :delay="400" 
      @inner-more-callback="innerMoreCallback"
      textType="저평가"
    >
      <template #title>
        {{ evaluation.value }}% {{ evaluation.text }}되었습니다.
      </template>
      <template #subtitle>
        {{ evaluation.text }}?
      </template>
    </StockEvaluationText>


    <StockEvaluationText 
      :delay="700"
      @inner-more-callback="innerMoreCallback"
      textType="상승여력"
    >
      <template #title>
        {{ possible }}
      </template>
      <template #subtitle>
        상승여력?
      </template>
    </StockEvaluationText>
    <StockEvaluationText :delay="1000" />
    
    <v-dialog 
      max-width="400"
      min-height="200" 
      v-model="dialog"
    >
      <v-card min-height="200" max-width="400" rounded="xl">
        <EvaluationDialogContents :contentType="dialogType" />
      </v-card>
    </v-dialog>
  </div> 

</template>

<script setup lang="ts">

  import { computed, ref } from 'vue'
  import { useStockStore } from '@/store/stock'
  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockEvaluationInfo from '@/components/detail/evaluation/EvaluationInfo.vue'
  import StockEvaluationText from '@/components/detail/evaluation/EvaluationText.vue'
  import EvaluationDialogContents, { DialogType } from '@/components/detail/evaluation/EvaluationDialogContent'
  

  const { stockEvaluation, stock } = useStockStore()  
  const loading = computed(() => !stockEvaluation.loading && !stock.loading)

  const dialog = ref<boolean>(false)
  const dialogType = ref<DialogType | undefined>()

  const close = computed(() => stock.data.close)
  const evaluationClose = computed(() => stockEvaluation.data['S-rim'].at(-1) as number)
  const possible = computed(() => close.value - evaluationClose.value)
  
  const evaluation = computed(() => {
    const highVal = close.value > evaluationClose.value

    return {
      text: highVal ? '고평가' : '저평가',
      textClass: highVal ? 'blue-text' : 'red-text',
      value: (Math.abs((close.value - evaluationClose.value) /  evaluationClose.value * 100)).toFixed(1)
    }
  })

  const innerMoreCallback = (e: DialogType) => {
    dialog.value = true
    dialogType.value = e
  }
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}

.CardLayout {
  padding-top: 0px;
  margin-top: 5px;
}


</style>