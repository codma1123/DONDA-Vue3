<template>
  <transition name="fade" :duration="2200">
    <v-card       
      class="CardLayout"
      color="cardlayout"
      elevation="0"
      @click="push(`/detail/${stock.data.code}/statement`)"
      v-if="loading"
    >
      <v-card-title class="innerTitle">        
        <div class="d-flex justify-center">
          <v-chip label variant="text">
            <v-icon start class="mr-3" icon="mdi-cash-register"/>
            재무제표
          </v-chip>          
        </div>
        <div class="innerMore">
          재무제표 자세히보기
        </div>

      </v-card-title>            
    </v-card>    
  </transition>
</template>

<script setup lang="ts">
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import _ from 'lodash'
  import { StatementType } from '@/models/stock';
  import { NavigationFailure, useRouter } from 'vue-router';


  const { stock } = useStockStore()
  const router = useRouter()
  const loading = computed(() => !stock.loading)


  const push = (link: string): Promise<void | NavigationFailure | undefined> => router.push(link)


</script>

<style scoped lang="scss">
.CardLayout {  
}


</style>