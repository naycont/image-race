<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/race/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import NoImages from '@/components/images/NoImages.vue'
import imageService from '@/services/image'
import type Image from '@/interfaces/Image'
import { ref, watch, computed } from 'vue'
import imageList from '@/services/mockData/imagesList.json'
import { useDialogStore } from '@/stores/dialog'
import { useScoreStore } from '@/stores/score'
import { DIALOG_TYPES } from '@/utils/constants'

const dialogStore = useDialogStore()
const scoreStore = useScoreStore()

const images = ref<Image[]>([])
const searchControlsKey = ref<number>(new Date().getTime())
const isLoading = ref<boolean>(false)
const isSearchResult = ref<boolean>(false)

const dialogConfiguration = computed(() => dialogStore.dialog)
const score = computed(() => scoreStore.score)
const hasWinner = computed(() => scoreStore.hasWinner)
const restartBtnDisabled = computed(() => scoreStore.getFullScore() === 0)
const noSearchResults = computed(() =>
  Boolean(isSearchResult.value && images.value.length === 0 && !isLoading.value)
)

const onSearchImage = async (searchString: string) => {
  try {
    const scoreItems = score.value
    isLoading.value = true
    isSearchResult.value = true
    images.value = []

    /*const response = await imageService.search({
      query: searchString,
      per_page: scoreItems.length
    })*/

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
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onRestart = () => {
  dialogStore.activeDialog({
    ...dialogConfiguration.value,
    title: 'Confirmación',
    message: '¿Está seguro de que desea reiniciar los puntos?, al confirmar perderá tu progreso',
    type: DIALOG_TYPES.confirm,
    params: JSON.stringify({
      confirmed: true
    })
  })
}

const onClearSearch = () => {
  images.value = []
  isSearchResult.value = false
}

const gameOver = () => {
  images.value = []
  searchControlsKey.value = new Date().getTime()
  const winner = score.value[0]

  dialogStore.activeDialog({
    ...dialogConfiguration.value,
    title: 'Ganador!',
    message: `${winner.sellerName} ha ganado ${scoreStore.getFullScore()} puntos!`,
    okButton: 'Continuar',
    type: DIALOG_TYPES.success,
    hasCloseButton: false,
    params: JSON.stringify({
      finished: true
    })
  })
}

const claimPrize = () => {
  console.log('claim prize')
}

watch(dialogConfiguration, (nextDialogConfiguration) => {
  const data = nextDialogConfiguration?.data ? JSON.parse(nextDialogConfiguration.data) : {}
  if (data.finished) {
    dialogStore.closeDialog()
    searchControlsKey.value = new Date().getTime()
    images.value = []
    scoreStore.initScore()
  }
})

watch(hasWinner, (newWinner) => {
  if (newWinner) {
    claimPrize()
    gameOver()
  }
})

watch(score, () => {
  if (images.value.length) {
    images.value = []
    isSearchResult.value = false
    searchControlsKey.value = new Date().getTime()
  }
})
</script>
<template>
  <div class="view-layout">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="12" lg="10">
        <SearchControls
          :key="searchControlsKey"
          :restartBtnDisabled="restartBtnDisabled"
          :isLoading="isLoading"
          @searchImage="onSearchImage"
          @clearSearch="onClearSearch"
          @restart="onRestart"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4" no-gutters>
      <v-col cols="12" sm="12" md="12" lg="10">
        <Ranking />
      </v-col>
    </v-row>

    <ImagesList class="mt-6" :items="images" />

    <v-row justify="center" class="mt-4" no-gutters v-if="noSearchResults">
      <v-col cols="12"><NoImages /></v-col>
    </v-row>
  </div>
</template>
