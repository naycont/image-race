<script lang="ts" setup>
import { ref } from 'vue'
import ActionButton from '@/components/ui/ActionButton.vue'
const searchString = ref<string>('')

const onSearchImage = (event: SubmitEvent) => {
  event.preventDefault()
  console.log('seraching image....', searchString.value)
}
</script>

<template>
  <v-form>
    <v-row justify="center" class="align-center mt-4">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-text-field
          v-model="searchString"
          variant="outlined"
          label="Search Image"
          bg-color="#fff"
          hide-details
          rounded
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="2" md="2" lg="2">
        <div class="d-flex">
          <ActionButton type="submit" @click="onSearchImage" text="Search"></ActionButton>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
