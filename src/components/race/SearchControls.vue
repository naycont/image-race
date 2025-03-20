<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue'
import ActionButton from '@/components/global/ActionButton.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { searchValidationRules } from '@/utils/searchValidationRules'

defineProps({
  restartBtnDisabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const searchString = ref<string>('')

const emit = defineEmits(['searchImage', 'restart', 'clearSearch'])

// responsiveness added: get breakpoints to disply action button on the right
const breakpoints = useBreakpoints(breakpointsTailwind)
const isSmallerDevice = breakpoints.smaller('md')

const onSearchImage = (event: SubmitEvent) => {
  event.preventDefault()
  if (!searchString.value.trim()) return

  emit('searchImage', searchString.value)
}

const clearSearch = () => {
  searchString.value = ''
  emit('clearSearch')
}
</script>

<template>
  <v-form data-testid="search">
    <div :class="['d-flex', 'ga-4', { 'flex-column': isSmallerDevice }]">
      <v-text-field
        v-model="searchString"
        variant="outlined"
        label="Buscar Imagen"
        bg-color="#fff"
        rounded
        prepend-inner-icon="search"
        clearable
        @click:clear="clearSearch"
        :rules="searchValidationRules.required"
        hide-details
        data-testid="search__textfield"
      ></v-text-field>

      <div
        :class="['d-flex', 'ga-4', 'align-center', { 'justify-space-between': isSmallerDevice }]"
      >
        <v-btn
          variant="outlined"
          color="primary"
          density="default"
          icon="replay"
          :disabled="restartBtnDisabled"
          @click="emit('restart')"
          data-testid="search__restart-button"
        ></v-btn>

        <ActionButton
          type="submit"
          @click="onSearchImage"
          text="Buscar"
          :disabled="isLoading"
          :loading="isLoading"
          data-testid="search__search-button"
        ></ActionButton>
      </div>
    </div>
  </v-form>
</template>
