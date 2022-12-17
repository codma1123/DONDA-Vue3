<template>
  <div ref="trigger"></div>
</template>

<script setup lang="ts">

import { onMounted, onUnmounted, ref } from 'vue';

  const trigger = ref()
  const options = {
    root: null,
    threshold: 1
  }

  let observer: any = null
  const handleIntersect = (entry: any) => {
    if (entry.isIntersecting) emit('triggerIntersected', trigger.value)
  }

  const emit = defineEmits<{ 
    (e: 'triggerIntersected', payload: any): void
  }>()

  onMounted(() => {
    try {
      observer = new IntersectionObserver(entries => {
        handleIntersect(entries[0])
      }, options)
      observer.observe(trigger.value)
    } catch (e) {
      console.log(e)
    }
  }) 

  onUnmounted(() => {
    observer.value?.disconnect();
  });

</script>

<style scoped>

</style>