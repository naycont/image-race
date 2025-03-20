<script lang="ts" setup>
import SearchControls from '@/components/race/SearchControls.vue'
import Ranking from '@/components/ranking/Ranking.vue'
import ImagesList from '@/components/images/ImagesList.vue'
import NoImages from '@/components/images/NoImages.vue'
import imageService from '@/services/image'
import invoiceService from '@/services/invoice'
import type Image from '@/interfaces/services/Image'
import { ref, watch, computed } from 'vue'
import { useDialogStore } from '@/stores/dialog'
import { useScoreStore } from '@/stores/score'
import { DIALOG_TYPES } from '@/utils/constants'
import type Invoice from '@/interfaces/services/Invoice'
import type Score from '@/interfaces/Score'
import type { Prize, PrizeItem } from '@/interfaces/Prize'
import { PaymentMethod } from '@/interfaces/services/Invoice'

const dialogStore = useDialogStore()
const scoreStore = useScoreStore()

const images = ref<Image[]>([])
const searchControlsKey = ref<number>(new Date().getTime())
const isLoading = ref<boolean>(false)
const isSearchResult = ref<boolean>(false)

const dialogConfiguration = computed(() => dialogStore.dialog)
const score = computed(() => scoreStore.score)
const winner = computed(() => scoreStore.winner)
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

    const response = await imageService.search({
      query: searchString,
      per_page: scoreItems.length
    })

    // const response = imageList.slice(0, scoreItems.length)
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
    message: '¿Estás seguro de que desea reiniciar la partida?, al confirmar perderás tu progreso',
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

const gameOver = async (winner: Score) => {
  images.value = []
  searchControlsKey.value = new Date().getTime()

  dialogStore.activeDialog({
    ...dialogConfiguration.value,
    title: `¡Has votado!`,
    message: `<div class="d-flex flex-column">
      Has ayudado a ${winner.sellerName} a generar una factura con los puntos de todos los jugadores en esta partida.
      <span class="mt-2 text-success"> Puntos totales: ${scoreStore.getFullScore()} </span>
    </div>`,
    okButton: 'Continuar',
    type: DIALOG_TYPES.success,
    hasCloseButton: false,
    params: JSON.stringify({
      finished: true
    })
  })
}

const claimPrize = async (winner: Score): Promise<Prize | null> => {
  try {
    const today = new Date()
    const currentMonth: number = today.getMonth() + 1
    const formattedMonth: string = currentMonth < 9 ? `0${currentMonth}` : currentMonth.toString()

    const formattedDate = `${today.getFullYear()}-${formattedMonth}-${today.getDate()}`

    const invoice: Invoice = {
      paymentMethod: PaymentMethod['credit-card'],
      items: [{ id: 1, price: 10, quantity: scoreStore.getFullScore() }],
      client: 1, //público en general
      date: formattedDate,
      dueDate: formattedDate,
      seller: { id: winner.sellerId }
    }
    const response = await invoiceService.create(invoice)
    const data = response ? response.id : {}
    let prize: Prize | null = null

    if (data.id) {
      prize = {
        id: data?.id || '',
        date: data?.date || '',
        status: data?.status || '',
        total: data?.number || 0,
        items:
          data?.items?.map(({ id, name, price, quantity }: PrizeItem) => {
            return { id, name, price, quantity }
          }) || []
      }
    }

    return prize
  } catch (error) {
    console.error(error)
    return null
  }
}

watch(dialogConfiguration, (nextDialogConfiguration) => {
  const data = nextDialogConfiguration?.data ? JSON.parse(nextDialogConfiguration.data) : {}
  if (data.confirmed) {
    dialogStore.closeDialog()
    searchControlsKey.value = new Date().getTime()
    images.value = []
    scoreStore.initScore()
  }
})

watch(winner, async (newWinner) => {
  if (newWinner?.sellerId) {
    gameOver(newWinner)
    await claimPrize(newWinner)
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
        <Ranking preview />
      </v-col>
    </v-row>

    <ImagesList class="mt-6" :items="images" />

    <v-row justify="center" class="mt-4" no-gutters v-if="noSearchResults">
      <NoImages />
    </v-row>
  </div>
</template>
