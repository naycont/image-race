<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useDialogStore } from '@/stores/dialog'
import { DIALOG_TYPES } from '@/utils/constants'
import { useScoreStore } from '@/stores/score'
import { useSideNavigationStore } from '@/stores/sideNavigation'

const router = useRouter()

const dialogStore = useDialogStore()
const scoreStore = useScoreStore()
const sideNavigationStore = useSideNavigationStore()

const dialogConfiguration = computed(() => dialogStore.dialog)
const currenRoute = computed(() => router.currentRoute.value.name)

const confirmExit = () => {
  if (currenRoute.value !== 'race') {
    router.push({ name: 'home' })
    sideNavigationStore.close()
    return
  }

  dialogStore.activeDialog({
    ...dialogConfiguration.value,
    title: 'Confirmación',
    message: '¿Estás seguro de que deseas abandonar?, al confirmar perderás tu progreso',
    type: DIALOG_TYPES.confirm,
    params: JSON.stringify({
      exit: true
    })
  })
}

watch(dialogConfiguration, (nextDialogConfiguration) => {
  const data = nextDialogConfiguration?.data ? JSON.parse(nextDialogConfiguration.data) : {}
  if (data.exit) {
    dialogStore.closeDialog()
    sideNavigationStore.close()
    scoreStore.initScore()
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <v-app-bar flat>
    <template v-slot:prepend v-if="currenRoute !== 'home'">
      <v-btn icon="menu" @click="sideNavigationStore.toggle()"></v-btn>
    </template>
    <v-app-bar-title>
      Las
      <span class="text-accent">mejores</span>
      imágenes del mundo
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn
        icon="logout"
        color="grey-darken-1"
        @click="confirmExit"
        v-if="currenRoute !== 'home'"
      ></v-btn>
    </template>
  </v-app-bar>
</template>
