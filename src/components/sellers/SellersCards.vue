<script lang="ts" setup>
import type Seller from '@/interfaces/services/Seller'
import { type PropType } from 'vue'
import useStatusColorConfiguration from '@/composables/statusConfiguration'
import { SELLER_ACTIONS as ACTIONS } from '@/utils/constants'

defineProps({
  items: {
    type: Array as PropType<Array<Seller>>,
    default: () => []
  }
})
</script>
<template>
  <div class="w-100">
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="3" v-for="item in items" :key="`itemCard-${item.id}`">
        <v-card class="item-card">
          <template v-slot:title>
            <span class="text-h5">{{ item.name }}</span>
          </template>

          <v-divider></v-divider>

          <v-card-text class="item-card__content">
            <div class="d-flex flex-column">
              <span>
                {{ item.observations }}
              </span>
              <v-chip :color="useStatusColorConfiguration(item.status)" class="mt-2">
                {{ item.status }}
              </v-chip>
            </div>
          </v-card-text>

          <v-card-actions>
            <div class="d-flex align-center justify-space-between w-100">
              <div class="d-flex ga-2">
                <v-btn
                  flat
                  variant="outlined"
                  size="x-small"
                  :icon="action.icon"
                  :color="action.color"
                  v-for="(action, index) in ACTIONS"
                  :key="`action-${index}`"
                  @click="$emit('selectedAction', { action: action.action, seller: item })"
                ></v-btn>
              </div>
              <v-btn
                flat
                variant="outlined"
                size="x-small"
                icon="edit"
                color="primary"
                @click="$emit('openDialog', item)"
              ></v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.item-card {
  &__content {
    height: 100px;
  }
}
</style>
