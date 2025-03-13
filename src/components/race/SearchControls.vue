<script lang="ts" setup>
import { ref } from 'vue'
import ActionButton from '@/components/ui/ActionButton.vue'

const searchString = ref<string>('')

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

// responsiveness added: get breakpoints to disply action button on the right
const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerDevice = breakpoints.smaller('md')

const onSearchImage = (event: SubmitEvent) => {
  event.preventDefault()
  console.log('seraching image....', searchString.value)
}
</script>

<template>
  <v-form>
    <v-row justify="center" :class="['align-center', { 'mt-2': !isSmallerDevice }]">
      <v-col cols="12" sm="12" md="9" lg="8" class="py-0">
        <v-text-field
          v-model="searchString"
          variant="outlined"
          label="Buscar Imagen"
          bg-color="#fff"
          hide-details
          rounded
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="3" lg="2">
        <div
          :class="[
            'd-flex',
            'ga-4',
            { 'justify-end': !isSmallerDevice },
            { 'justify-space-between': isSmallerDevice }
          ]"
        >
          <v-btn variant="outlined" color="primary" density="default" icon="replay"></v-btn>
          <ActionButton type="submit" @click="onSearchImage" text="Buscar"></ActionButton>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
