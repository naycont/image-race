<script lang="ts" setup>
import SellersList from '@/components/sellers/SellersList.vue'
import SellersCards from '@/components/sellers/SellersCards.vue'
import EditSeller from '@/components/sellers/EditSeller.vue'
import ActionButton from '@/components/global/ActionButton.vue'
import type Seller from '@/interfaces/services/Seller'
import { ref, onMounted, computed, watch } from 'vue'
import sellerService from '@/services/seller'
import { CRUD_ACTIONS, STATUS, DIALOG_TYPES } from '@/utils/constants'
import { useDialogStore } from '@/stores/dialog'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const sellers = ref<Seller[]>([])
const isEditionActive = ref<boolean>(false)
const currentSeller = ref<Seller | null>(null)
const editSellerKey = ref<number>(new Date().getTime())
const isLoading = ref(false)

const dialogStore = useDialogStore()
const dialogConfiguration = computed(() => dialogStore.dialog)

// responsiveness added: get breakpoints to switch view cards instead of list
const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerThanLg = breakpoints.smaller('lg')

const getSellersList = async () => {
  try {
    isLoading.value = true
    const responseData: Array<Seller> = await sellerService.get()
    const sellersList: Array<Seller> = responseData?.length ? responseData : []

    return sellersList
  } catch (error) {
    console.error(error)
    return []
  } finally {
    isLoading.value = false
  }
}

const onOpenFormDialog = (seller: Seller | null) => {
  isEditionActive.value = true
  currentSeller.value = seller
  editSellerKey.value = new Date().getTime()
}

const onSellerSaved = async () => {
  sellers.value = []
  isEditionActive.value = false
  editSellerKey.value = new Date().getTime()
  sellers.value = await getSellersList()
}

const deleteSeller = async (seller: Seller) => {
  try {
    isLoading.value = true
    await sellerService.delete(seller.id)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onSelectedAction = async (params: { action: string; seller: Seller }) => {
  const { action, seller } = params
  try {
    isLoading.value = true
    if (action === CRUD_ACTIONS.delete) {
      confirmDelete(seller)
    }

    if (action === CRUD_ACTIONS.toggleStatus) {
      const newStatus = seller.status === STATUS.active ? STATUS.inactive : STATUS.active
      await sellerService.put(seller.id, { ...seller, status: newStatus })
      onSellerSaved()
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const confirmDelete = (seller: Seller) => {
  dialogStore.activeDialog({
    ...dialogConfiguration.value,
    title: 'Confirmación',
    message: `<div class="d-flex ">
      ¿Deseas eliminar este vendedor? Esta acción no se puede deshacer.
    </div>`,
    okButton: 'Acpetar',
    type: DIALOG_TYPES.confirm,
    params: JSON.stringify({
      deleteSeller: true,
      seller
    })
  })
}

watch(dialogConfiguration, async (nextDialogConfiguration) => {
  const data = nextDialogConfiguration?.data ? JSON.parse(nextDialogConfiguration.data) : {}
  if (data.deleteSeller) {
    await deleteSeller(data.seller)
    dialogStore.closeDialog()
    await onSellerSaved()
  }
})

onMounted(async () => {
  sellers.value = await getSellersList()
})
</script>
<template>
  <div class="view-layout">
    <div class="text-h4">Vendedores</div>
    <EditSeller
      :key="editSellerKey"
      :isActive="isEditionActive"
      :seller="currentSeller"
      @closeDialog="isEditionActive = !isEditionActive"
      @saved="onSellerSaved"
    />

    <div class="d-flex justify-end mb-4">
      <ActionButton
        text="Agregar"
        prepend-icon="add"
        @click="onOpenFormDialog(null)"
        :disabled="isLoading"
      />
    </div>

    <v-progress-linear color="secondary" indeterminate v-if="isLoading"></v-progress-linear>

    <SellersCards
      :items="sellers"
      v-if="isSmallerThanLg"
      @openDialog="onOpenFormDialog"
      @selectedAction="onSelectedAction"
    />
    <SellersList
      :items="sellers"
      @openDialog="onOpenFormDialog"
      @selectedAction="onSelectedAction"
      v-else
    />
  </div>
</template>
