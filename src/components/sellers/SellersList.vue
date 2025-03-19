<script lang="ts" setup>
import type Seller from '@/interfaces/services/Seller'
import { STATUS } from '@/utils/constants'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  items: {
    type: Array as PropType<Array<Seller>>,
    default: () => []
  }
})

const getStatusColor = (status: string) => {
  const color = status === STATUS.active ? 'primary' : 'secondary'
  return color
}

const goToDetails = (sellerId: string) => {
  //router.push({ name: 'seller', params: { id: sellerId } })
}
</script>
<template>
  <div class="w-100">
    <v-table data-testid="sellerList">
      <thead data-testid="sellerList__headers">
        <tr>
          <th data-testid="sellerList__headers--name" class="text-left">Nombre</th>
          <th data-testid="sellerList__headers--status" class="text-left">Estatus</th>
          <th data-testid="sellerList__headers--observations" class="text-left">Observaciones</th>
          <th data-testid="sellerList__headers--actions" class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody data-testid="sellerList__items">
        <tr
          :data-testid="`sellerList__items--${seller.id}`"
          v-for="seller in items"
          :key="`job-${seller.id}`"
        >
          <td :data-testid="`sellerList__items--${seller.id}-title`">{{ seller.name }}</td>
          <td>
            <v-chip :color="getStatusColor(seller.status)">{{ seller.status }}</v-chip>
          </td>
          <td>{{ seller.observations }}</td>

          <td class="text-center">
            <v-btn flat variant="outlined" size="x-small" icon="edit" color="primary"></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
