<template>
  <div v-if="(!market.loading && !marketValuation.loading)">    
    <v-card-title class="mt-15 ml-4">
      시장 동향
    </v-card-title>  
    <v-card-subtitle class="ml-4"> 
      주식 시장이 어떻게 변하고 있는지 알아보세요. 
    </v-card-subtitle>      

    <v-divider class="mt-5 ml-4 mr-4"/>

    <MarketCard 
      v-for="(content, i) in marketValuation.data "
      :title="content.market"
      :content="computedMarket[i]"
      :chartData="market.data[marketTypes[i]]"
    />
  </div>

  <v-progress-circular 
    v-else
    class="ProgressCircular" 
    indeterminate 
    color="white"
    :value="100"
  />

</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { useStockStore } from "@/store/stock"
  import { MarketTypes } from '@/models/stock' 
  import MarketCard from "@/components/market/MarketCard.vue";

  export interface ComputedMarket {
    close: number;
    changes: string;
    prefixer: string;
    colorClass: string;
  }
  
  // consts
  const marketTypes: MarketTypes[] = ['kospi', 'nasdaq', 'snp500', 'usdkrw']  

  // hooks
  const { market, marketValuation } = useStockStore()
    
  const computedMarket = computed<ComputedMarket[]>(() => {
    const { data } = market
    return marketTypes.map(market => {
      const recent = data[market].values?.at(-1)
      return {
        close: recent?.close ?? 0,
        changes: (recent?.changes ?? 0).toLocaleString(),
        prefixer: (recent?.changes ?? 0) > 0 ? '+' : '',
        colorClass: (recent?.changes ?? 0) > 0 ? 'text-red' : 'text-blue'
      }
    })
  })




</script>

<style lang="scss" scoped>
$margin-size : 1rem;
.MarketCard {  
  padding: 0px !important;
  margin: $margin-size;
  display: flex;
  height: 120px;
  align-items: start;
  cursor: default;
  overflow: hidden;      
}

.Title {
  margin-top: 50px;
  margin-left: 15px;
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}



</style>
