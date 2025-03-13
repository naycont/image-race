<script lang="ts" setup>
import { defineProps } from 'vue'
import ImageCard from '@/components/images/ImageCard.vue'
import type Image from '@/interfaces/Image'

defineProps({
  items: {
    type: Array<Image>,
    default: () => []
  }
})
</script>
<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" lg="3" v-for="item in items" :key="item.id">
      <ImageCard :url="item.url" />
    </v-col>
  </v-row>
</template>
