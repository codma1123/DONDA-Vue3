<template>
  <transition name="fade">
    <v-sheet 
      class="NavBar" 
      width="430"
      min-height="45"        
      ref="navBar"
    > 
      <div class="logo">DONDA - VUE3</div>
      <div class="IconBox">
        <transition name="slide-up">
          <v-btn 
            v-if="searchBarToggle"
            absolute
            class="SearchBtn" 
            icon="mdi-magnify" 
            flat size="25" 
            @click="toggle"
          />
          <v-text-field v-else 
            ref="searchBar"
            absolute
            :autofocus="autofocus"
            variant="underlined"
            class="SearchBar" 
            @blur="(searchBarToggle = true)"
            @keyup.enter="(searchBarToggle = true)"
          />
          
        </transition>
        <v-btn icon="mdi-home" flat size="25" @click="$router.push('/')" />
      </div>
    </v-sheet>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

  const searchBarToggle = ref(true)
  const autofocus = ref(false)

  const searchBar = ref<HTMLInputElement | null>(null)
  
  const toggle = () => {
    searchBarToggle.value = false
    setTimeout(() => {
      searchBar.value?.focus()
    }, 90)
  }



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

.SearchBtn {
  position: absolute;
  right: 50px;
}
.SearchBar {
  position: absolute;
  max-height: 20px;
  min-width: 150px;
  top: -10px;
  right: 50px;
}

.IconBox {
  gap: 5px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.1s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}



</style>