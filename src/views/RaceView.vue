<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import imageService from '@/services/image'
import type Image from '@/interfaces/Image'
import { ref, watch, computed } from 'vue'
import imageList from '@/services/mockData/imagesList.json'
import { useDialogStore } from '@/stores/dialog'
import sellerService from '@/services/seller'
import type Seller from '@/interfaces/services/Seller'

const dialogStore = useDialogStore()

const images = ref<Image[]>([])

const dialogConfiguration = computed(() => dialogStore.dialog)

const onSearchImage = async (searchString: string) => {
  try {
    const sellers: Seller[] = await sellerService.get()
    const activeSellers = sellers.filter((seller) => seller.status === 'active')

    /*const response = await imageService.search({
      query: searchString,
      per_page: activeSellers.length
    }) */
    const response = imageList.slice(0, activeSellers.length)
    if (response?.length) {
      images.value = response.map((image, index) => {
        const seller = activeSellers[index]
        return {
          ...image,
          sellerId: seller.identification,
          sellerName: seller.name
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

watch(dialogConfiguration, (nextDialogConfiguration) => {
  if (nextDialogConfiguration.confirmed) {
    console.log('restart game')
    images.value = []
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
