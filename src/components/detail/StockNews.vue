<template>
  <transition name="fade" :duration="2400">
    <v-card    
      elevation="0"
      class="CardLayout"
      color="cardlayout"
      @click="push(`/detail/${stock.data.code}/news`)"
      v-if="loading"
    > 

      <v-card-title class="innerTitle">
        <div class="d-flex">
          <v-chip label variant="text">
            <v-icon start class="mr-3">mdi-newspaper-variant-multiple-outline</v-icon> 
            뉴스
          </v-chip>
        </div>
        <div class="innerMore">
          최근 뉴스 확인하기
        </div>
      </v-card-title>      
      <!-- <StockNewsContent 
        v-for="(content, i) in contents"
        :key="i"
        :content="content"
      />
      
      <div class="d-flex justify-center align-center">
        <ProgressCircular v-if="contentCountLoad" class="mb-2 mt-4"/>      
        <Observer v-if="contentCountLoad" @triggerIntersected="loadMore"/>
      </div> -->
    </v-card>
  </transition>
</template>


<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';

  import { useCustomRouter } from '@/mixins/customRouter';

  const { news, stock } = useStockStore()
  const { push } = useCustomRouter()  
  const loading = computed(() => !news.loading)
  
</script>
