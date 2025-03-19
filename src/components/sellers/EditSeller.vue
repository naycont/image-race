<script lang="ts" setup>
import ActionButton from '@/components/global/ActionButton.vue'
import type Seller from '@/interfaces/services/Seller'
import { STATUS, CRUD_ACTIONS } from '@/utils/constants'
import sellerService from '@/services/seller'
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  seller: {
    type: [Object, null],
    default: null
  }
})

const emit = defineEmits(['closeDialog', 'saved'])

const isLoading = ref(false)
const formSeller = ref<Seller>({
  id: props.seller?.id || '0',
  name: props.seller?.name || '',
  identification: props.seller?.identification || '',
  status: props.seller?.status || STATUS.active,
  observations: props.seller?.observations || ''
})

const configuration = computed(() =>
  props.seller === null
    ? { action: CRUD_ACTIONS.add, title: 'Agregar', icon: 'add' }
    : { action: CRUD_ACTIONS.edit, title: 'Editar', icon: 'edit' }
)

const save = async () => {
  try {
    isLoading.value = true
    if (configuration.value.action === CRUD_ACTIONS.edit) {
      await sellerService.put(formSeller.value.id, formSeller.value)
    }
    if (configuration.value.action === CRUD_ACTIONS.add) {
      await sellerService.post(formSeller.value)
    }
    emit('saved')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-dialog
    max-width="500"
    :model-value="isActive"
    content-class="global-dialog"
    persistent
    transition="dialog-top-transition"
  >
    <template v-slot:default>
      <v-card>
        <template v-slot:prepend>
          <v-icon color="secondary" :icon="configuration.icon"></v-icon>
        </template>

        <template v-slot:title>{{ configuration.title }} vendedor</template>

        <v-divider></v-divider>

        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                variant="outlined"
                label="Nombre"
                required
                v-model="formSeller.name"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                no-resize
                variant="outlined"
                label="Observaciones"
                v-model="formSeller.observations"
              ></v-textarea>
            </v-col>

            <v-col cols="12" v-if="configuration.action === CRUD_ACTIONS.edit">
              <div class="d-flex align-center">
                <span class="mr-2">Estatus</span>
                <v-switch
                  color="primary"
                  :false-value="STATUS.inactive"
                  :true-value="STATUS.active"
                  v-model="formSeller.status"
                  hide-details
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <ActionButton
            color="grey-darken-1"
            text="Cancelar"
            @click="$emit('closeDialog')"
          ></ActionButton>

          <ActionButton
            @click="save()"
            text="Guardar"
            :disabled="isLoading"
            :loading="isLoading"
          ></ActionButton>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
