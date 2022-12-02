<template>
  <transition name="fade">
    <v-sheet 
      class="NavBar" 
      color="cardlayout" 
      width="430"
      min-height="40"        
      ref="navBar"
    > 
      <v-btn flat icon color="cardlayout" size="25" @click="$router.push('/')">
        <v-icon x-small>mdi-home</v-icon>
      </v-btn>
    </v-sheet>
  </transition>
</template>

<script setup lang="ts">



</script>

<style lang="scss" scoped>
.NavBar {
  position: fixed;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: 20px;
  overflow: hidden;
  display: flex;
  justify-content: end;
  padding-right: 20px;
  padding-top: 10px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all .5s ease;
}



</style>