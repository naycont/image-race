<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeading from '@/components/TheHeading.vue'
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="h-100">
        <TheHeading />
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
