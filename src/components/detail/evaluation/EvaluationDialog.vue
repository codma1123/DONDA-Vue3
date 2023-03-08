<template>
  <v-dialog
    max-width="400"
    min-height="200"
  >
    <v-card
      min-height="200"
      max-width="400"
      rounded="xl"
    >
      <EvaluationDialogContents :contentType="dialogType" />
      <v-card-actions class="text-end">
        <v-btn @click="emit('disableDialog')">
          닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import EvaluationDialogContents, { DialogType } from './EvaluationDialogContent';

  interface EvaluationDialogProps {
    dialogType: DialogType | undefined
  }

  interface EvaluationDialogEmits {
    (e: 'disableDialog'):  void
  }

  const { dialogType } = defineProps<EvaluationDialogProps>()

  const emit = defineEmits<EvaluationDialogEmits>()
  

</script>

<style scoped>

</style>