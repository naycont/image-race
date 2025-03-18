<script lang="ts" setup>
import Progress from '@/components/ranking/Progress.vue'
import sellerService from '@/services/seller'
import type Seller from '@/interfaces/services/Seller'
import { ref } from 'vue'

const sellers = ref<Seller[]>([])

const getSellers = async () => {
  try {
    const response = await sellerService.get()

    const data: Seller[] = response?.data?.length ? response.data : []

    sellers.value = data.filter((seller) => seller.status === 'active')
  } catch (error) {
    console.error(error)
  }
}

getSellers()
</script>
<template>
  <div>
    <Progress
      v-for="seller in sellers"
      :key="`seller-${seller.id}`"
      :competitorName="seller.name"
      color="#FFD700"
      :score="0"
    />
  </div>
</template>
