<template>
  <transition name="fade">
    <v-sheet 
      class="NavBar" 
      width="430"
      min-height="40"        
      ref="navBar"
    > 
      <div class="logo">DONDA - VUE3</div>
      <v-btn flat icon size="25" @click="$router.push('/')">
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
  z-index: 10;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-top: 10px;

  .logo {
    opacity: .8;
    margin-left: 30px;
    font-weight: bold;
    letter-spacing: .125rem;
  }
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