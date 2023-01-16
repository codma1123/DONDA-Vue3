<template>
  <transition name="fade">
    <v-sheet 
      class="NavBar" 
      width="430"
      min-height="45"        
      ref="navBar"
      v-if="!searchTable.loading"
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
          <div v-else class="SearchBar" >
            <v-text-field 
              ref="searchBar"
              absolute
              :autofocus="autofocus"
              variant="underlined"              
              @blur="(searchBarToggle = true)"
              @keyup.enter="searchBarEnter"
              v-model="searchBarContent"
            />            
          </div>
          
        </transition>
        <v-btn icon="mdi-home" flat size="25" @click="$router.push('/')" />
      </div>
      <div v-if="!searchBarToggle" class="AutoCompleteContents">
        <div v-for="item in autoCompleteContents" :key="item">
          {{ item }}
        </div>
      </div>  
    </v-sheet>
    
  </transition>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useStockStore } from '@/store/stock';
  import { getKeyByValue, delay } from '@/mixins/tools';
  import { useCustomRouter } from '@/mixins/customRouter';
  import { getRegExp } from 'korean-regexp'

  // Custom Hooks
  const { searchTable } = useStockStore()
  const { push } = useCustomRouter()


  // Refs
  const searchBarToggle = ref(true)
  const autofocus = ref(false)
  const searchBar = ref<HTMLInputElement | null>(null)
  const searchBarContent = ref<string>('')
  const filteredAutoCompleteContents = ref<any>()

  const autoCompleteContents = computed(() => {
    if(searchBarContent.value === '') return null
    return filteredAutoCompleteContents.value
  })


  // Comuted Values
  const searchTableEntries = computed<[string, string][]>(() => Object.entries(searchTable.data))


  // Hooks
  const toggle = () => {
    searchBarToggle.value = false
    searchBarContent.value = ''
    setTimeout(() => searchBar.value?.focus(), 100)
  }

  const searchBarEnter = () => {
    const code = getKeyByValue(searchTable.data, searchBarContent.value)    
    code && push(`/detail/${code}`)    
    searchBarContent.value = ''
    searchBarToggle.value = true
  }
  

  watch(searchBarContent, (v: string) => {
    const reg = getRegExp(v)
    filteredAutoCompleteContents.value = searchTableEntries.value.filter(title => title[1].match(reg))
  })


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

.AutoCompleteContents {
  position: absolute;
  
}



</style>