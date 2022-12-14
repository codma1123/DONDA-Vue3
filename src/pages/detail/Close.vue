<template>
  <div class="DetailLayout">
    <StockClose />
  </div>
</template>

<script setup lang="ts">

  import StockClose from '../../components/detail/StockClose.vue';

</script>

<style scoped lang="scss">
$margin: 1rem;
.DetailLayout {
  margin: $margin;
  margin-top: 55px;  
}


</style>