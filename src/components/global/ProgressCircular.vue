<template>
  <v-progress-circular 
    :class="absolute ? 'ProgressCircular' : ''" 
    indeterminate 
    color="white" 
    :value="100"
    :size="size"
  />
</template>
<script setup lang="ts">

  interface Props {
    absolute?: boolean
    size?: string | number
  }

  const { absolute = false, size = 'default' } = defineProps<Props>()  
</script>

<style lang="scss" scoped>
.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>