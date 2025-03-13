<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import imageService from '@/services/imageService'
import type Image from '@/interfaces/Image'
import { ref } from 'vue'
import imageList from '@/services/mockData/imagesList.json'
const images = ref<Image[]>([])

const onSearchImage = async (searchString: string) => {
  console.log('searhching image...', searchString)
  try {
    /*const response = await imageService.search({
      query: searchString
    }) */
    const response = imageList

    if (response?.length) {
      images.value = response
    }

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <v-container class="h-100">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="10">
        <SearchControls @searchImage="onSearchImage" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>

    <ImagesList class="mt-6" :items="images" />
  </v-container>
</template>
