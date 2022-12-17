<template>
  <v-card v-if="loading" elevation="0">
    <v-divider />
    <v-card-subtitle class="mt-5">
      시가총액
    </v-card-subtitle>
    <v-card-text v-font-size="45">
      {{ priceCompactFormatter.format(stockData.marcap)}}      
    </v-card-text>       

    <!-- <v-card-subtitle class="mt-5">
      거래대금
    </v-card-subtitle>
    <v-card-text v-font-size="45">
      {{ priceCompactFormatter.format(stockData.amount)}}
    </v-card-text>        -->

    <div class="d-flex">
      <div>
        <v-card-subtitle class="mt-5">
          상장주식수
        </v-card-subtitle>
        <v-card-text v-font-size="45">
          {{ priceCompactFormatter.format(stockData.stocks).slice(1)}}
        </v-card-text>       
      </div>

      <div>
        <v-card-subtitle class="mt-5">
          상장주식수
        </v-card-subtitle>
        <v-card-text v-font-size="45">
          {{ priceCompactFormatter.format(stockData.stocks).slice(1)}}
        </v-card-text>       
      </div>      
    </div>

    
    
    <!-- <v-card-actions class="d-flex mt-1">
      <v-chip 
        class="ml-3"
        label
        v-for="preFixer in preFixerIterator"
        :key="preFixer.type"
      >
      {{ preFixer.type }} {{ preFixer.index}}위
      </v-chip>
    </v-card-actions> -->

    <v-divider />
    
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import { priceCompactFormatter } from '@/mixins/tools';  
  import { RankTypes } from '@/api/types';
  import _ from 'lodash';

  const rankTypes = ["change_incr", "change_redu", "marcap", "volume"]
  type RankTypeKorean = '상승률' | '하락률' | '시가총액' | '거래량'

  interface PreFixer {
    index?: number
    type?: RankTypeKorean
  }

  const rankTypeMap: Record<RankTypes, RankTypeKorean> = {
    change_incr: '상승률',
    change_redu: '하락률',
    marcap: '시가총액',
    volume: '거래량'
  }
  
  const { stock, rank } = useStockStore()
  
  const loading = computed(() => !stock.loading && !rank.loading)
  const stockData = computed(() => stock.data)

  const preFixerIterator = computed<PreFixer[]>(() => {
    return rankTypes
      .map(type => checkRanked(type as RankTypes))
      .filter(type => !_.isEmpty(type))      
  })

  const checkRanked = (rankType : RankTypes): PreFixer => {
    const index = rank.data[rankType].findIndex(rankContents => rankContents.code === stock.data.code) + 1
    if (!index) return {}
    return { index, type: rankTypeMap[rankType] }      
  }

  
  







</script>

<style scoped>

</style>