<template>
  <transition name="fade" :duration="2400">
    <v-card    
      elevation="0"
      class="CardLayout"
      color="cardlayout"
      @click="goRoute"
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
  import { computed, ref } from 'vue';

  import StockNewsContent from '@/components/detail/StockNewsContent.vue';
  import ProgressCircular from '@/components/global/ProgressCircular.vue';
  import Observer from '@/components/global/Observer.vue';
  import { useCustomRouter } from '@/mixins/customRouter';
  import router from '@/router';

  const contentsCount = ref<number>(3)
  const contentCountLoad = ref<boolean>(true)

  const { news, stock } = useStockStore()
  const { push } = useCustomRouter()  
  const loading = computed(() => !news.loading)
  

  const loadMore = (): void => {        
    if(contentsCount.value > news.data.length - 5) {
      contentCountLoad.value = false
      return
    }

    new Promise(resolve => {
        setTimeout(() => {
        contentsCount.value += 3
        resolve(contentsCount.value)
      }, 500)      
    })
  }
 
  const goRoute = () => {
    const code = `/detail/${stock.data.code}/news`
    push(code)
  }
    
</script>

<style scoped>

</style>