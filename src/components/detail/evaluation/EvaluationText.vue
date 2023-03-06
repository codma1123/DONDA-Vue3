<template>
  <transition name="fade" :duration="props.delay + 300">
    <v-card 
      v-if="!animationLoading"
      class="CardLayout"
      color="cardlayout"
      elevation="0"
    >
      <v-card-title class="innerTitle">
        <slot name="title"></slot>

        <div class="innerMore" @click="(e) => emit('innerMoreCallback', props.textType)">
          <slot name="subtitle"></slot>
        </div>

      </v-card-title>      
    </v-card>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DialogType } from './EvaluationDialogContent';

  interface EvaluationTextProp {
    delay: number
    textType?: DialogType
  }

  interface EvaluationTextEmit {
    (target: 'innerMoreCallback', e: DialogType): void
  } 

  const props = withDefaults(defineProps<EvaluationTextProp>(), { delay: 2000, textType: '저평가' })
  const emit = defineEmits<EvaluationTextEmit>()

  const animationLoading = ref<boolean>(true)

  onMounted(() => {    
    setTimeout(() => {
      animationLoading.value = false
    }, props.delay)
  })
     
</script>

<style scoped lang="scss">
.CardLayout {
  margin-top: 20px !important;
}

.innerTitle {
  padding-top: 10px;
  font-size: 15px;
}

.innerMore {
  font-size: 13px;
}
.fade-enter-active {
  .innerTitle {
    transition: all 0.3s ease-in-out;  
    transition-delay: .35s;        
  }
}
</style>