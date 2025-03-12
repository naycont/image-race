<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <v-footer absolute app>
    <div class="the-footer pa-4">naycont@gmail.com {{ currentYear }}</div>
  </v-footer>
</template>
