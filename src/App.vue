<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeading from '@/components/TheHeading.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <v-app>
    <TheHeading />
    <v-main style="background-color: #f4f5fb">
      <v-container class="h-100" style="background-color: #fff">
        <RouterView />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>
