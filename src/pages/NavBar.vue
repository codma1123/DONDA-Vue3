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
              @blur="onSearchBarBlur"
              @keydown="onSearchBarKeydown"
              v-model="searchBarContent"
            />            
          </div>
          
        </transition>
        <v-btn icon="mdi-home" flat size="25" @click="$router.push('/')" />
      </div>      
    </v-sheet>
    
  </transition>
  <div v-if="!searchBarToggle" class="AutoCompleteContents">
    <transition name="slide-up">
      <v-list v-if="autoCompleteContents"> 
        <div         
          v-for="[code, title], i in autoCompleteContents" 
          :key="code"           
          :class="['AutoCompleteContent', i + 1 === currentCursor ? 'active' : '']"
          rounded="xl"
          @mousedown="push('/detail/' + code)"
        >
          <!-- <div class="divider"></div> -->
          <span class="title"> {{ title }} </span>
          <span class="code"> {{ code }} </span>
        </div>
      </v-list>
    </transition>
  </div>  
</template>

<script setup lang="ts">
  import { computed, Ref, ref, watch } from 'vue';
  import { useStockStore } from '@/store/stock';
  import { getKeyByValue, delay } from '@/mixins/tools';
  import { useCustomRouter } from '@/mixins/customRouter';
  import { getRegExp } from 'korean-regexp'

  // Custom Hooks
  const { searchTable } = useStockStore()
  const { push } = useCustomRouter()


  // Map
  const KeyBoardEventMap: { [key: string]: (cursor: Ref<number>) => void } = {
    'ArrowUp': cursor => {                  
      if(!cursor.value) return
      cursor.value--      
    },

    'ArrowDown': cursor => {
      if(cursor.value === (maxCursorLength.value - 1)) return      
      cursor.value++
    },

    'Enter': cursor => {
      let code: string | undefined = ''

      if (!cursor.value) {
        code = getKeyByValue(searchTable.data, searchBarContent.value)
        if(code === '') return                 
      }
      else {
        if (!autoCompleteContents.value) return
        code = autoCompleteContents.value[currentCursor.value - 1][0]
      }

      push(`/detail/${code}`)
      searchBarContent.value = ''
      searchBarToggle.value = true
    }
  }

  


  // Refs
  const searchBarToggle = ref(true)
  const autofocus = ref(false)
  const searchBar = ref<HTMLInputElement | null>(null)
  const searchBarContent = ref<string>('')
  const currentCursor = ref<number>(0)
  
  
  // Comuted Values
  const searchTableEntries = computed<[string, string][]>(() => Object.entries(searchTable.data))
  const maxCursorLength = computed(() => filteredAutoCompleteContents.value?.length)
  
  const autoCompleteContents = computed(() => {
    if(searchBarContent.value === '') return null
    return filteredAutoCompleteContents.value
  })
  
  const filteredAutoCompleteContents = computed(() => {
    const reg = getRegExp(searchBarContent.value)
    return searchTableEntries.value.filter(title => title[1].match(reg))
  })
  
  // Hooks
  const toggle = () => {
    searchBarToggle.value = false
    searchBarContent.value = ''
    setTimeout(() => searchBar.value?.focus(), 100)
  }  

  const onSearchBarBlur = () => {
    searchBarToggle.value = true
    currentCursor.value = 0
  }

  const checkPreventKey = (key: string): boolean => {
    switch (key) {      
      case 'ArrowUp':            
      case 'ArrowDown':
      case 'Process':
      case 'Enter':
        return true
      default: return false
    }
  }

  const onSearchBarKeydown = (e: KeyboardEvent) => {
    
    if (checkPreventKey(e.key)) e.preventDefault()    
    if(e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Enter') return

    KeyBoardEventMap[e.key](currentCursor)
    console.log(currentCursor.value)
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

.AutoCompleteContents {
  background-color: #333333;
  max-height: 200px;
  width: 150px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 60px;
  margin-left: 175px;
  z-index: 101;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  
  .AutoCompleteContent {
    padding: .25rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    .divider {
      opacity: .5;
      border-bottom: .5px solid #888888;

    }
    .title {
      font-size: 18px;
    }

    .code {
      opacity: .8;
      font-size: 13px;
      margin-left: .25rem;
    }
  }

  .active {
    background-color: #666666;
  }
}



</style>