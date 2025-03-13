import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Dialog from '@/interfaces/global/Dialog'

export const useDialogStore = defineStore('dialog', () => {
  const dialog = ref<Dialog>({
    isActive: false,
    title: '',
    message: ''
  })

  const setDialog = (configuration: Dialog) => {
    dialog.value = {
      isActive: configuration.isActive,
      title: configuration.title,
      message: configuration.message
    }
  }

  const activeDialog = ({ title, message, isActive = true }: Dialog) => {
    setDialog({
      isActive: isActive,
      title: title,
      message: message
    })
  }

  const closeDialog = () => {
    setDialog({
      isActive: false,
      title: '',
      message: ''
    })
  }

  return { dialog, activeDialog, closeDialog }
})
