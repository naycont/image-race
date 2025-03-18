import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Dialog from '@/interfaces/global/Dialog'

export const useDialogStore = defineStore('dialog', () => {
  const defaultDialogConfiguration = {
    isActive: false,
    title: '',
    message: '',
    closeButton: 'Cancelar',
    confirmed: false
  }

  const dialog = ref<Dialog>(defaultDialogConfiguration)

  const setDialog = (configuration: Dialog) => {
    dialog.value = {
      isActive: configuration.isActive,
      title: configuration.title,
      message: configuration.message,
      closeButton: configuration.closeButton,
      confirmed: configuration.confirmed
    }
  }

  const activeDialog = (dialog: Dialog) => {
    setDialog({
      ...defaultDialogConfiguration,
      isActive: true,
      title: dialog.title,
      message: dialog.message,
      closeButton: dialog.closeButton
    })
  }

  const closeDialog = () => {
    setDialog(defaultDialogConfiguration)
  }

  const confirmDialog = () => {
    setDialog({
      ...defaultDialogConfiguration,
      confirmed: true
    })
  }

  return { dialog, activeDialog, closeDialog, confirmDialog }
})
