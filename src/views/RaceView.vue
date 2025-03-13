<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
</script>
<template>
  <v-container class="h-100">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="10">
        <SearchControls />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>

    <ImagesList class="mt-6" />
  </v-container>
</template>
