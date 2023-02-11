<template>
  <v-chip-group
    v-model="selected"
    mandatory        
    selected-class="text-secondary"
    class="vChipGroup"
  >
    <v-chip                 
      v-for="tag in tags"          
      label
      class="vChip"
      :key="tag"
      :value="tag"
    >
      {{ tag }}
    </v-chip>
  </v-chip-group>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const marketMapping = {
    '시가총액': 'marcap',
    '거래량': 'volume',
    '상승률': 'change_incr',
    '하락률': 'change_redu' 
  } as const

  type TagType = keyof (typeof marketMapping)



  const props = defineProps<{
    modelValue: TagType
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: TagType): void
  }>()
    


  const tags = ref<TagType[]>(['시가총액', '거래량', '상승률', '하락률'])

  const selected = computed({
    get() {
      return props.modelValue
    },
    set(newVal) {
      emit('update:modelValue', newVal)
    }
  })

</script>

<style scoped lang="scss">

  $margin: 1rem;
  .vChipGroup {
    display: flex;
    justify-content: space-around;
    margin: $margin;
    margin-bottom: 10px;
    flex-grow: auto;

    .vChip {
      display: flex;
      justify-content: center;
      width: 25%;
      border-radius: .75rem;
    }
  }
</style>
