<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home' })
}

const currenRoute = computed(() => router.currentRoute.value.name)
</script>

<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Las
      <span class="text-accent">mejores</span>
      imágenes del mundo
    </v-app-bar-title>
    <template v-slot:append v-if="currenRoute !== 'home'">
      <v-btn icon="logout" color="grey-darken-1" @click="goToHome"></v-btn>
    </template>
  </v-app-bar>
</template>
