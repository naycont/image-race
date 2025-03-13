<script lang="ts" setup>
const currentYear: number = new Date().getFullYear()
</script>

<template>
  <v-footer absolute app class="pa-0 bg-background">
    <div class="the-footer pa-4">
      <span class="font-weight-light">naycont@gmail.com {{ currentYear }}</span>
    </div>
  </v-footer>
</template>
