import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSideNavigationStore = defineStore('sideNavigation', () => {
  const opened = ref(false)

  const toggle = () => {
    opened.value = !opened.value
  }

  return { opened, toggle }
})
