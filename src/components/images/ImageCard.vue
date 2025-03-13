<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
  url: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <v-card flat border="sm">
    <v-img color="surface-variant" height="300" :src="url" cover></v-img>

    <v-card-actions>
      <div class="d-flex justify-space-between w-100 align-center">
        <span>
          <v-icon icon="account_circle"></v-icon>
          fireArt studio
        </span>

        <v-btn flat color="pink" icon="favorite_border"></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
