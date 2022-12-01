<template>
  <div>
    이거슨 {{ params.marketType}}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
const params = route.params


</script>

<style scoped>

</style>