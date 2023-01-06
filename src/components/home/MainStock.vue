<template>
  <v-card          
    :width="CONTENT_WIDTH"
    height="90"
    class="MarketCard"      
    theme="dark"
    color="#333333"
    elevation="0"
    @click="push(`/detail/${rankContent.code}`)"
  >
    <v-card-subtitle v-font-size="15" class="mt-2"> 
      {{ rankContent.market }} 
      {{ rankContent.code }}
    </v-card-subtitle>
    <div class="d-flex align-end justify-space-between">
      <v-card-title v-font-size="20"> 
        <div>
          {{ rankContent.title }}            
        </div>          
      </v-card-title>        
      <div class="mr-3 mb-2"> 
        <span v-font-size="23"> 
          {{ rankContent.close }}
        </span>
        <span class="ml-1" v-font-size="12"> 
          {{ rankContent.prefix }}{{ rankContent.change }}
          </span>
      </div>
    </div>            
  </v-card> 
</template>

<script setup lang="ts">
  import { useCustomRouter } from '@/mixins/customRouter'
  import { useLayout } from '@/mixins/layout'
  import { RankContent } from '@/models/stock'

  const { rankContent } = defineProps<{ rankContent: RankContent }>()
  const { CONTENT_WIDTH } = useLayout()
  const { push } = useCustomRouter()  
</script>
