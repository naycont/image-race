<script lang="ts" setup>
import ImageCard from '@/components/images/ImageCard.vue'
</script>
<template>
  <v-row>
    <v-col class="mt-0" cols="12" sm="6" md="6" lg="3" v-for="index in 5" :key="index">
      <ImageCard />
    </v-col>
  </v-row>
</template>
