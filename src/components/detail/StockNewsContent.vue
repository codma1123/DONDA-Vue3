<template>
  <v-card
    class="CardLayout NewsContentCard"
    color="cardlayout"
    elevation="0"
    @click="pushNews"
  >
    <v-card-title v-font-size="12" class="font-weight-bold">
      {{ content.title }}    
    </v-card-title>
    <v-card-text class="NewsContent">
      {{ content.content }}
    </v-card-text>    
    <div v-font-size="13" class="NewsContentActions">
      <div v-font-size="13">{{ content.newspaper }}</div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { NewsType } from '@/models/stock';
  import { computed } from 'vue'

  const { content: prop } = defineProps<{ content: NewsType}>()
  
  const content = computed<{ 
    title: string,
    url: string,
    content: string,
    newspaper: string,
  }>(() => ({
    title: prop.subject,
    url: prop.url,
    content: prop.summary.split('...')[0] + '...',
    newspaper: prop.summary.split('...')[1].slice(0, -5),

  }))

  const pushNews = () => {
    window.open(content.value.url, '_blank')
  }
 

</script>

<style scoped lang="scss">



.NewsContent {
  font-size: 12px;
}

.NewsContentActions {
  display: flex;
  justify-content: end;
  padding: 5px;
  opacity: .8;
}
</style>