<template>
  <div>

  </div>

</template>

<script setup lang="ts">

  import { useStockStore } from '../../store/stock';

  interface Props {
    content: any
  }

  const props = defineProps<Props>()

  const { rank } = useStockStore()
</script>

<style scoped>

</style>