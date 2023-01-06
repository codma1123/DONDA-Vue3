<template>
  <div class="d-flex justify-space-between mt-8 align-end">
    <v-card-title class="ml-3" v-font-size="16">
      시가총액이 높은 기업들입니다.
    </v-card-title>      
    <v-btn 
      variant="plain" 
      v-font-size="12" 
      class="mr-2"
      @click="push('/rank')"
    >
      자세히..
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  import { useCustomRouter } from '@/mixins/customRouter';
  const { push } = useCustomRouter() 
</script>

<style scoped>

</style>