<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'
import { useDialogStore } from '@/stores/dialog'
import { DIALOG_TYPES } from '@/utils/constants'
import { useScoreStore } from '@/stores/score'

const router = useRouter()

const dialogStore = useDialogStore()
const scoreStore = useScoreStore()

const dialogConfiguration = computed(() => dialogStore.dialog)
const currenRoute = computed(() => router.currentRoute.value.name)

const confirmExit = () => {
  const dialog = dialogStore.dialog

  dialogStore.activeDialog({
    ...dialog,
    title: 'Confirmación',
    message: '¿Estás seguro de que deseas abandonar?, al confirmar perderás tu progreso',
    type: DIALOG_TYPES.confirm
  })
}

watch(dialogConfiguration, (nextDialogConfiguration) => {
  if (nextDialogConfiguration.confirmed) {
    scoreStore.initScore()
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Las
      <span class="text-accent">mejores</span>
      imágenes del mundo
    </v-app-bar-title>
    <template v-slot:append v-if="currenRoute !== 'home'">
      <v-btn icon="logout" color="grey-darken-1" @click="confirmExit"></v-btn>
    </template>
  </v-app-bar>
</template>
