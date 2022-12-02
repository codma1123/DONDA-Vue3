<template>
  <v-sheet height="500" :class="CENTER_CLASS">
    랭크 페이지..
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLayout } from '../mixins/layout';

  const { CENTER_CLASS } = useLayout()

  onMounted(() => {
    console.log('rank mount')
  })
</script>

<style scoped>

</style>