<template>
  <div class="DetailLayout">
    <!-- Title -->
    <StockTitle />

    <StockStatement />
  </div>
</template>

<script setup lang="ts">

  import StockTitle from '@/components/detail/StockTitle.vue'
  import StockStatement from '@/components/detail/statement/StockStatementsInfo.vue'
  import { useAppStore } from '@/store/app';
  import { onMounted } from 'vue';

  const { scrollReset } = useAppStore()

  onMounted(() => scrollReset())

</script>
