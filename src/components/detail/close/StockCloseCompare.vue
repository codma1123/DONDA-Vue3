<template>
  <v-sheet class="px-2 mt-5 d-flex flex-wrap justify-space-around">
    <div 
      v-for="(content, i) in comparePriceIterator"
      :key="i"
      class="mt-1 d-flex align-center mr-3 comparePriceWrapper"        
    >
      <div class="chipWarpper">
        <v-chip 
          label
          :style="{ backgroundColor: content.comparePrice.per.includes('-') ? '#4169E1' : '#B22222'}"
          class="chip">{{ content.text }}</v-chip>
      </div>
      <div class="textWrapper">
        {{ content.comparePrice.per }}%
      </div>
    </div>

  </v-sheet>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { StockType } from '../../../models/stock';
  import { useStockStore } from '../../../store/stock';

  interface IComparePrice {
    text: string
    per: string
  }

  interface IComparePriceIterator {
    text: string
    comparePrice: IComparePrice
  }

  const { stockData } = defineProps<{ stockData: StockType}>()
  const { stockGraphAll } = useStockStore()

  const chartData = computed(() => stockGraphAll.data)

  const comparePriceIterator = computed<IComparePriceIterator[]>(() => [
    { text: '1주전 대비', comparePrice: comparePrice(7) },
    { text: '전달 대비', comparePrice: comparePrice(30) },
    { text: '전분기 대비', comparePrice: comparePrice(120) },
    { text: '전년 대비', comparePrice: comparePrice(360) },
  ])

  
  const comparePrice = (target: number): IComparePrice => {
    const targetPrice = Object.values(chartData.value).at(target * (-1)) || 0
    const origin = stockData.close

    const text = targetPrice < origin ? '증가' : '감소'
    const per = ((origin - targetPrice) * 100 / origin).toFixed(1)
    return { text, per }    
  }


</script>

<style lang="scss" scoped>
.comparePriceWrapper {
  width: 150px;  
}

.chipWarpper {

  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;

  .chip {
    opacity: .95;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.textWrapper {
  padding: .25rem;
  min-width: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
</style>