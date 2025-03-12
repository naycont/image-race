<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="h-100">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
