<script lang="ts" setup>
import type Seller from '@/interfaces/services/Seller'
import { CRUD_ACTIONS, STATUS } from '@/utils/constants'
import { type PropType } from 'vue'

defineProps({
  items: {
    type: Array as PropType<Array<Seller>>,
    default: () => []
  }
})

const actions = [
  { title: 'Eliminar', action: CRUD_ACTIONS.delete, icon: 'delete', color: 'error' },
  { title: 'Desactivar', action: CRUD_ACTIONS.toggleStatus, icon: 'unpublished', color: 'primary' }
]

const getStatusColor = (status: string) => {
  const color = status === STATUS.active ? 'primary' : 'secondary'
  return color
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
            <v-btn
              flat
              variant="outlined"
              size="x-small"
              icon="edit"
              color="primary"
              @click="$emit('openDialog', seller)"
            ></v-btn>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="more_vert" variant="text" v-bind="props" size="x-small"></v-btn>
              </template>

              <v-list class="py-1" density="compact" slim>
                <v-list-item
                  v-for="(action, index) in actions"
                  :key="index"
                  :value="index"
                  @click="$emit('selectedAction', { action: action.action, seller: seller })"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="action.icon" :color="action.color"></v-icon>
                  </template>
                  <v-list-item-title>
                    {{ action.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
