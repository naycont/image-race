<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <v-btn class="action-button" color="primary" flat size="large" rounded="lg" v-bind="$attrs">
    {{ text }}
  </v-btn>
</template>
