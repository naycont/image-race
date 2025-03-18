<script lang="ts" setup>
import { useDialogStore } from '@/stores/dialog'
import { computed } from 'vue'
import ActionButton from './ActionButton.vue'

const dialogStore = useDialogStore()

const dialogConfiguration = computed(() => dialogStore.dialog)
</script>
<template>
  <v-dialog
    max-width="500"
    :model-value="dialogConfiguration.isActive"
    content-class="global-dialog"
  >
    <template v-slot:default>
      <v-card>
        <template v-slot:prepend>
          <v-icon color="warning" icon="warning"></v-icon>
        </template>

        <template v-slot:title>
          {{ dialogConfiguration.title }}
        </template>

        <v-card-text>
          {{ dialogConfiguration.message }}
        </v-card-text>

        <v-card-actions>
          <ActionButton
            color="grey-darken-1"
            :text="dialogConfiguration.closeButton"
            @click="dialogStore.closeDialog()"
          ></ActionButton>

          <ActionButton @click="dialogStore.confirmDialog()" text="Confimar"></ActionButton>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
