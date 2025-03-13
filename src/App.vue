<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeading from '@/components/TheHeading.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <v-app>
    <TheHeading />
    <v-main>
      <v-container fluid class="h-100 main-container">
        <RouterView />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>
