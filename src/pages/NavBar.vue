<template>
  <v-sheet 
    class="NavBar" 
    color="primary" 
    width="430"
    height="80"    
  > 
    <v-btn flat icon color="primary" size="25" @click="$router.push('/')">
      <v-icon x-small>mdi-home</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script setup lang="ts">import { useRouter } from 'vue-router';
const router = useRouter()

</script>

<style lang="scss" scoped>
.NavBar {
  overflow: hidden;
  display: flex;
  justify-content: end;
  padding-right: 20px;
  padding-top: 10px;
}
</style>