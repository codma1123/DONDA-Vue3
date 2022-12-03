<template>
  <div>
    {{ test }}
  </div>
    <!-- <v-card
      v-for="(content, i) in contents"
      class="RankContent"        
      height="90"
      :widtd="CONTENT_WIDTH"
      color="cardlayout"
      :key="i"
      elevation="2"
    >        
      <v-card-subtitle v-font-size="15" class="mt-2"> {{ content.market }} </v-card-subtitle>
      <div class="d-flex align-end justify-space-between">
        <v-card-title> 
          <span v-font-size="25"> {{ i + 1 }}</span>
          <span v-font-size="20" class="pl-2"> {{ content.title }} </span>            
          </v-card-title>        
        <div class="mr-3 mb-2"> 
          <span v-font-size="23"> 
            {{ content.close }}  
          </span>
          <span class="ml-1" v-font-size="12"> 
            {{ content.prefix }}{{ content.change }}
          </span>
        </div>
      </div>    
    </v-card> -->

</template>

<script setup lang="ts">
  import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLayout } from '../../mixins/layout';
  import { useStockStore } from '../../store/stock';    

  const { rank } = useStockStore()
  const { CONTENT_WIDTH } = useLayout()
  const route = useRoute()

  const contents = computed(() => rank.data)
  const test = computed(() => route.params)
</script>

<style scoped lang="scss">
  $margin: 1rem;
  .RankContent {
    margin: $margin;
    margin-top: 2px;
    padding-top: 10px;
      
    border-radius: 1.2rem;

    cursor: pointer;

    &:nth-child(2n) {
      background-color: #424242 !important;
    }

    &:hover {
      background-color: lighten(#333333, 10%) !important;
    }        
  }
</style>