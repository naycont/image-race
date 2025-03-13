<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const searchString = ref<string>('')

const emit = defineEmits(['searchImage'])

// responsiveness added: get breakpoints to disply action button on the right
const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerDevice = breakpoints.smaller('md')

const onSearchImage = (event: SubmitEvent) => {
  event.preventDefault()
  emit('searchImage', searchString.value)
}
</script>

<template>
  <v-form>
    <div :class="['d-flex', 'ga-4', { 'flex-column': isSmallerDevice }]">
      <v-text-field
        v-model="searchString"
        variant="outlined"
        label="Buscar Imagen"
        bg-color="#fff"
        hide-details
        rounded
      ></v-text-field>

      <div :class="['d-flex', 'ga-4', { 'justify-space-between': isSmallerDevice }]">
        <v-btn variant="outlined" color="primary" density="default" icon="replay"></v-btn>
        <ActionButton type="submit" @click="onSearchImage" text="Buscar"></ActionButton>
      </div>
    </div>
  </v-form>
</template>
