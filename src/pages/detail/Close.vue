<template>
  <div class="DetailLayout">    

    <!-- Title -->
    <StockTitle />
      
    <!-- Close -->
    <StockCloses :stockData="stockData" />

    <!-- CloseChart -->
    <StockCloseChart v-if="loading" :chartData="chartData" />

    


    <!-- Compare -->
    <v-sheet class="px-2 mt-5 d-flex flex-wrap justify-space-around">

      <div 
        v-for="(content, i) in comparePriceIterator"
        :key="i"
        class="mt-1 d-flex align-center mr-3 comparePriceWrapper"        
      >
        <div class="chipWarpper">
          <v-chip 
            :style="{ backgroundColor: content.comparePrice.per.includes('-') ? '#4169E1' : '#B22222'}"
            class="chip">{{ content.text }}</v-chip>
        </div>
        <div 
          class="textWrapper"
          
        >
          {{ content.comparePrice.per }}%
        </div>
      </div>

    </v-sheet>






  </div>
</template>

<script setup lang="ts">

  import { computed, ref, onMounted } from 'vue'  
  import { useStockStore } from '../../store/stock';

  import StockCloseChart from '../../components/detail/close/StockCloseChart.vue';
  import StockTitle from '../../components/detail/StockTitle.vue'
  import StockCloses from '../../components/detail/close/StockCloses.vue'


  interface IComparePrice {
    text: string
    per: string
  }

  interface IComparePriceIterator {
    text: string
    comparePrice: IComparePrice
  }
  
  /**
   * custom hook
   */
  const { stockGraphAll, stock } = useStockStore()

  /**
   * state
   */
  const appear = ref<boolean>(false)
  const expandToggle = ref<boolean>(true)



  /**
   * computed
   */
  const chartData = computed(() => stockGraphAll.data)
  const loading = computed<boolean>(() => !stock.loading && !stockGraphAll.loading)
  const stockData = computed(() => stock.data)
  
  const computedChanges = computed<string>(() => {
    const change = stock.data.changes
    return change > 0 ? '+' + change.toLocaleString() : '₩' + change.toLocaleString()
  })

  const computedChangeRatio = computed<string>(() => {
    const changes_ratio = stock.data.changes_ratio as number
    return changes_ratio > 0 ? '+' + changes_ratio.toLocaleString() : '' + changes_ratio.toLocaleString()
  })

  const comparePriceIterator = computed<IComparePriceIterator[]>(() => [
    { text: '1주전 대비', comparePrice: comparePrice(7) },
    { text: '전달 대비', comparePrice: comparePrice(30) },
    { text: '전분기 대비', comparePrice: comparePrice(120) },
    { text: '전년 대비', comparePrice: comparePrice(360) },
  ])


  /**
   * method
   */
  const priceFormat = (price: number) => '₩' + Number(price.toFixed(0)).toLocaleString()
  const volumeFormat = (price: number) => Number(price.toFixed(0)).toLocaleString()

  const comparePrice = (target: number): IComparePrice => {
    const targetPrice = Object.values(chartData.value).at(target * (-1)) || 0
    const origin = stockData.value.close

    const text = targetPrice < origin ? '증가' : '감소'
    const per = ((origin - targetPrice) * 100 / origin).toFixed(1)
    return { text, per }    
  }

  

  /**
   * hook
   */
  onMounted(() => {
    appear.value = false
    setTimeout(() => { appear.value = true }, 1000)
  })

  
  
</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}



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