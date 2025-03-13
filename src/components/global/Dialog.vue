<script lang="ts" setup>
import { useDialogStore } from '@/stores/dialog'
import { computed } from 'vue'

const dialogStore = useDialogStore()

const dialogConfiguration = computed(() => dialogStore.dialog)
</script>
<template>
  <v-dialog max-width="500" :model-value="dialogConfiguration.isActive">
    <template v-slot:default>
      <v-card :title="dialogConfiguration.title">
        <v-card-text>
          {{ dialogConfiguration.message }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close Dialog" @click="dialogStore.closeDialog()"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
