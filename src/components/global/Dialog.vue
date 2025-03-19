<script lang="ts" setup>
import { useDialogStore } from '@/stores/dialog'
import { computed } from 'vue'
import ActionButton from './ActionButton.vue'
import { DIALOG_TYPES } from '@/utils/constants'

const dialogStore = useDialogStore()

const dialogConfiguration = computed(() => dialogStore.dialog)
</script>
<template>
  <v-dialog
    max-width="500"
    :model-value="dialogConfiguration.isActive"
    content-class="global-dialog"
    persistent
    transition="dialog-top-transition"
  >
    <template v-slot:default>
      <v-card>
        <template v-slot:prepend>
          <v-icon
            color="warning"
            icon="warning"
            v-if="dialogConfiguration.type === DIALOG_TYPES.confirm"
          ></v-icon>

          <v-icon
            color="success"
            icon="check"
            v-if="dialogConfiguration.type === DIALOG_TYPES.success"
          ></v-icon>
        </template>

        <template v-slot:title>
          {{ dialogConfiguration.title }}
        </template>

        <v-divider></v-divider>

        <v-card-text>
          <slot name="content" :content="dialogConfiguration.message"></slot>
        </v-card-text>

        <v-card-actions>
          <ActionButton
            color="grey-darken-1"
            :text="dialogConfiguration.closeButton"
            @click="dialogStore.closeDialog()"
            v-if="dialogConfiguration.hasCloseButton"
          ></ActionButton>

          <ActionButton
            @click="dialogStore.confirmDialog()"
            :text="dialogConfiguration.okButton"
          ></ActionButton>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
