<template>
  <v-progress-circular 
    :class="absolute ? 'ProgressCircular' : ''" 
    indeterminate 
    color="white" 
    :value="100"
  />
</template>
<script setup lang="ts">

  interface Props {
    absolute?: boolean
  }

  const { absolute = false } = defineProps<Props>()  
</script>

<style lang="scss" scoped>
.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>