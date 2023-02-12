<template>
  <transition name="fade" :duration="1200"> 
    <v-card 
      v-if="(!loading && data)"
      class="CardLayout"
      color="cardlayout"
      elevation="0"
      @click="push(`/detail/${stock.data.code}/similar`)"
    >          
      <v-card-title class="innerTitle">
        <div class="d-flex">
          <v-chip label variant="text">
            <v-icon start class="mr-3">mdi-office-building-outline</v-icon> 
            시가총액
          </v-chip>
          <span class="ml-4">             
            {{ priceCompactFormatter.format(data.marcap) }}
          </span>
        </div>
        <div class="innerMore">
          비슷한 기업 보기
        </div>
      </v-card-title>      
    </v-card>
  </transition>
</template>

<script setup lang="ts">

  import { computed } from 'vue';
  import { priceCompactFormatter } from '@/mixins/tools';
  import { useStockStore } from '@/store/stock';
  import { useCustomRouter } from '@/mixins/customRouter';

  const { stock } = useStockStore()
  const { push } = useCustomRouter()

  const data = computed(() => stock.data)
  const loading = computed(() => stock.loading)

</script>
