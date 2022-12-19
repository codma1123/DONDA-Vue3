<template>
  <v-card v-if="loading" elevation="0">

    <div class="date"> 기준일 : {{ stockData.date }}</div>

    <v-divider />
    <v-sheet width="300">
      <v-chip class="ml-3 mt-2" label size="small">
        {{ stockData.sector }}
      </v-chip>
  
      <v-chip 
        class="ml-3 mt-2"
        label
        size="small"
        v-for="preFixer in preFixerIterator"
        :key="preFixer.type"
        @click="push('/rank')"
      >
        {{ preFixer.type }} {{ preFixer.index}}위
      </v-chip>
    </v-sheet>

    <v-card-subtitle class="mt-5"> 시가총액 </v-card-subtitle>

    <v-card-text v-font-size="45">
      <number 
        :from="0"
        :to="stockData.marcap"
        :format="priceFormat"
        :duration="1"
        :delay="0"
        easing="Power4.easeOut"
      />
    </v-card-text>

    <v-card-subtitle class="mt-5">
      거래대금
    </v-card-subtitle>
    <v-card-text v-font-size="45">
      <number 
        :from="0"
        :to="stockData.amount"
        :format="priceFormat"
        :duration="1.5"
        :delay="0"
        easing="Power4.easeOut"
      />
    </v-card-text>       

    <div class="d-flex">
      <div class="MarcapContent">
        <v-card-subtitle class="mt-5">
          상장주식수
        </v-card-subtitle>
        <v-card-text v-font-size="35">
          <number 
            :from="0"
            :to="stockData.stocks"
            :format="amountFormat"
            :duration="2"
            :delay="0"
            easing="Power4.easeOut"
          />
        </v-card-text>       
      </div>

      <div class="MarcapContent">
        <v-card-subtitle class="mt-5 closeIcon" @click="push(`/detail/${stockData.code}/close`)">
          종가 <v-icon>mdi-information</v-icon>
        </v-card-subtitle>
        <v-card-text v-font-size="35">
          <number 
            :from="0"
            :to="stockData.close"
            :format="priceFormat"
            :duration="1"
            :delay="0"
            easing="Power4.easeOut"
          />
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

    <v-divider class="mt-2"/>
    
  </v-card>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue'
  import { priceCompactFormatter } from '@/mixins/tools';  
  import { RankTypes } from '@/api/types';
  import _ from 'lodash';
  import { useRouter } from 'vue-router';

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
  const router = useRouter()
  
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

  const push = (link: string) => router.push(link)

  const priceFormat = (price: number) => priceCompactFormatter.format(price).slice()
  const amountFormat = (price: number) => priceCompactFormatter.format(price).slice(1)
  
</script>

<style scoped lang="scss">
.closeIcon {
  cursor: pointer;
  transition: all .3s ease;
  &:hover {
    opacity: 1 !important;
  }
}

.date {
  position: absolute;
  right: 0px;
  font-size: 12px;
  opacity: .5;
  margin-top: 10px;
}

.MarcapContent {
  width: 190px;
}
</style>