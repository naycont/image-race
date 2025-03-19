<script lang="ts" setup>
import SellersList from '@/components/sellers/SellersList.vue'
import ActionButton from '@/components/global/ActionButton.vue'
import type Seller from '@/interfaces/services/Seller'
import { ref, onMounted } from 'vue'
import sellerService from '@/services/seller'

const sellers = ref<Seller[]>([])

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

onMounted(async () => {
  sellers.value = await getSellersList()
})
</script>
<template>
  <div class="view-layout">
    <div class="d-flex justify-end"><ActionButton text="Agregar" prepend-icon="add" /></div>

    <SellersList :items="sellers" />
  </div>
</template>
