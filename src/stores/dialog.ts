import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Dialog from '@/interfaces/global/Dialog'

export const useDialogStore = defineStore('dialog', () => {
  const defaultDialogConfiguration = {
    isActive: false,
    title: '',
    message: '',
    closeButton: 'Cancelar',
    okButton: 'Confirmar',
    confirmed: false,
    type: '',
    hasCloseButton: true
  }

  const dialog = ref<Dialog>(defaultDialogConfiguration)

  const setDialog = (dialogConfiguration: Dialog) => {
    dialog.value = dialogConfiguration
  }

  const activeDialog = (dialog: Dialog) => {
    setDialog({
      ...defaultDialogConfiguration,
      isActive: true,
      title: dialog.title,
      message: dialog.message,
      closeButton: dialog.closeButton,
      okButton: dialog.okButton,
      type: dialog.type ? dialog.type : defaultDialogConfiguration.type,
      hasCloseButton: dialog.hasCloseButton
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
