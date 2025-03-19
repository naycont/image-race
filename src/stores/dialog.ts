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
    type: '',
    hasCloseButton: true,
    data: '',
    params: ''
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
      hasCloseButton: dialog.hasCloseButton,
      data: dialog.data,
      params: dialog.params
    })
  }

  const closeDialog = () => {
    setDialog(defaultDialogConfiguration)
  }

  const confirmDialog = () => {
    setDialog({
      ...dialog.value,
      data: dialog.value.params
    })
  }

  return { dialog, activeDialog, closeDialog, confirmDialog }
})
