<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
</script>
<template>
  <div class="h-100">
    <SearchControls />

    <v-row justify="center" class="align-center mt-6">
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>
    <ImagesList class="mt-6" style="background: #f5f5f7; border-radius: 8px" />
  </div>
</template>
