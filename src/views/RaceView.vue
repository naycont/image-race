<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import imageService from '@/services/image'
import type Image from '@/interfaces/Image'
import { ref, watch, computed } from 'vue'
import imageList from '@/services/mockData/imagesList.json'
import { useDialogStore } from '@/stores/dialog'
import { useScoreStore } from '@/stores/score'
import sellerService from '@/services/seller'
import type Seller from '@/interfaces/services/Seller'

const dialogStore = useDialogStore()
const scoreStore = useScoreStore()

const images = ref<Image[]>([])

const dialogConfiguration = computed(() => dialogStore.dialog)

const onSearchImage = async (searchString: string) => {
  try {
    const scoreItems = score.value

    /*const response = await imageService.search({
      query: searchString,
      per_page: scoreItems.length
    }) */
    const response = imageList.slice(0, scoreItems.length)
    if (response?.length) {
      images.value = response.map((image, index) => {
        const seller = scoreItems[index]
        return {
          ...image,
          sellerId: seller.sellerId,
          sellerName: seller.sellerName
        }
      })
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
    message: '¿Está seguro de que desea reiniciar los puntos?, al confirmar perderá tu progreso'
  })
}

const score = computed(() => scoreStore.score)

watch(dialogConfiguration, (nextDialogConfiguration) => {
  if (nextDialogConfiguration.confirmed) {
    images.value = []
    scoreStore.initScore()
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
