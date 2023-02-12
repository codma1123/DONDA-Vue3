<template>
  <!-- <transition name="fade" :duration="3000"> -->
    <div v-if="loaded">
      <v-card-title class="mt-2">
        유사종목
      </v-card-title>
      <v-card-subtitle>
        {{ stock.data.name }}와 유사한 종목을 살펴보세요.
      </v-card-subtitle>
  
      <v-slide-group 
        class="mt-3"
        center-active
      >
        <v-slide-group-item v-for="content in contents.data.slice(1)">
          <v-card 
            class="EtcCardLayout"
            color="cardlayout"
            @click="push(`/detail/${content.code}`)"
          >
            <v-card-title v-font-size="15">
              {{ content.name }}
            </v-card-title>
            <v-card-subtitle>
              {{ priceCompactFormatter.format(content.close) }}
            </v-card-subtitle>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>    
    </div>
  
  <!-- </transition> -->
</template>

<script setup lang="ts">
  import { useCustomRouter } from '@/mixins/customRouter';
  import { useStockStore } from '@/store/stock';
  import { computed } from 'vue';
  import { priceCompactFormatter } from '@/utils';

  const { push } = useCustomRouter()
  const { similarContents: contents, stock } = useStockStore()

  const loaded = computed(() => !contents.loading)   
</script>

<style scoped>

  .EtcCardLayout {
    width: 90px;    
    height: 100px;
    margin-right: 5px;
    margin-left: 5px;
  }

</style>