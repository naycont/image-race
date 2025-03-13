<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
</script>
<template>
  <div>
    <SearchControls />
    <v-row justify="center" class="align-center mt-6">
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>
  </div>
</template>
