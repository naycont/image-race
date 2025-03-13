<script lang="ts" setup>
import ImageCard from '@/components/images/ImageCard.vue'
</script>
<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" lg="3" v-for="index in 2" :key="index">
      <ImageCard />
    </v-col>
  </v-row>
</template>
