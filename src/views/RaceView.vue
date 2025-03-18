<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import imageService from '@/services/imageService'
import type Image from '@/interfaces/Image'
import { ref, watch, computed } from 'vue'
import imageList from '@/services/mockData/imagesList.json'
import { useDialogStore } from '@/stores/dialog'

const dialogStore = useDialogStore()

const images = ref<Image[]>([])

const dialogConfiguration = computed(() => dialogStore.dialog)

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

const onRestart = () => {
  const dialog = dialogStore.dialog

  dialogStore.activeDialog({
    ...dialog,
    title: 'Confirmación',
    message: '¿Está seguro de que desea reiniciar la partida?, al confirmar perderá su progreso'
  })
}

watch(dialogConfiguration, (nextDialogConfiguration) => {
  if (nextDialogConfiguration.confirmed) {
    console.log('restart game')
  }
})
</script>
<template>
  <div class="view-layout">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="12" lg="10">
        <SearchControls @searchImage="onSearchImage" @restart="onRestart" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4" no-gutters>
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>

    <ImagesList class="mt-6" :items="images" />
  </div>
</template>
