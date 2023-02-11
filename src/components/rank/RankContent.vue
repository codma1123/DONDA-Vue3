<template>
  <v-card
    class="RankContent"
    color="cardlayout"
    height="90"
    elevation="0"
    :width="CONTENT_WIDTH"
    @click="push(`/detail/${content.code}`)"
  > 
    <v-card-subtitle v-font-size="15" class="mt-2"> 
      {{ content.market }} 
    </v-card-subtitle>

    <div class="d-flex align-end justify-space-between">
      <v-card-title> 
        <span v-font-size="23"> {{ index + 1 }}</span>
        <span v-font-size="18" class="pl-2"> {{ content.title }} </span>            
      </v-card-title>        
      <div class="mr-3 mb-2"> 
        <div>
          <span v-font-size="20"> 
            {{ content.close }}  
          </span>
          <span class="ml-1" v-font-size="12"> 
            {{ content.prefix }}{{ content.change }}
          </span>
        </div>
      </div>
    </div>    
  </v-card>
</template>

<script setup lang="ts">
  
  import { useLayout } from '@/mixins/layout';
  import { RankContent } from '@/models/stock';
  import { useCustomRouter } from '@/mixins/customRouter';

  const { content } = defineProps<{
    content: RankContent
    index: number
  }>()

  const { CONTENT_WIDTH } = useLayout()
  const { push } = useCustomRouter()
 
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