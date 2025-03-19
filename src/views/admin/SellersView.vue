<script lang="ts" setup>
import SellersList from '@/components/sellers/SellersList.vue'
import EditSeller from '@/components/sellers/EditSeller.vue'
import ActionButton from '@/components/global/ActionButton.vue'
import type Seller from '@/interfaces/services/Seller'
import { ref, onMounted } from 'vue'
import sellerService from '@/services/seller'
import { CRUD_ACTIONS, STATUS } from '@/utils/constants'

const sellers = ref<Seller[]>([])
const isEditionActive = ref<boolean>(false)
const currentSeller = ref<Seller | null>(null)
const editSellerKey = ref<number>(new Date().getTime())
const isLoading = ref(false)

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

const onSelectedAction = async (params: { action: string; seller: Seller }) => {
  const { action, seller } = params
  try {
    isLoading.value = true
    if (action === CRUD_ACTIONS.delete) {
      await sellerService.delete(seller.id)
    }

    if (action === CRUD_ACTIONS.toggleStatus) {
      const newStatus = seller.status === STATUS.active ? STATUS.inactive : STATUS.active
      await sellerService.put(seller.id, { ...seller, status: newStatus })
    }
    onSellerSaved()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

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

    <div class="d-flex justify-end">
      <ActionButton
        text="Agregar"
        prepend-icon="add"
        @click="onOpenFormDialog(null)"
        :disabled="isLoading"
      />
    </div>

    <v-progress-linear
      class="mt-4"
      color="secondary"
      indeterminate
      v-if="isLoading"
    ></v-progress-linear>
    <SellersList
      :items="sellers"
      @openDialog="onOpenFormDialog"
      @selectedAction="onSelectedAction"
    />
  </div>
</template>
