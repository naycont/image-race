<script lang="ts" setup>
import SellersList from '@/components/sellers/SellersList.vue'
import EditSeller from '@/components/sellers/EditSeller.vue'
import ActionButton from '@/components/global/ActionButton.vue'
import type Seller from '@/interfaces/services/Seller'
import { ref, onMounted } from 'vue'
import sellerService from '@/services/seller'

const sellers = ref<Seller[]>([])
const isEditionActive = ref<boolean>(false)
const currentSeller = ref<Seller | null>(null)
const editSellerKey = ref<number>(new Date().getTime())

const getSellersList = async () => {
  try {
    const responseData: Array<Seller> = await sellerService.get()
    const sellersList: Array<Seller> = responseData?.length ? responseData : []

    return sellersList
  } catch (error) {
    console.error(error)
    return []
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
      <ActionButton text="Agregar" prepend-icon="add" @click="onOpenFormDialog(null)" />
    </div>

    <SellersList :items="sellers" @openDialog="onOpenFormDialog" />
  </div>
</template>
