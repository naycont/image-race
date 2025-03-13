<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  competitorName: {
    type: String,
    default: ''
  },
  currentPoints: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    default: 20
  }
})

const pointsLeft = computed(() => props.goal - props.currentPoints)
</script>
<template>
  <div class="d-flex flex-column w-100 px-2">
    <span>{{ competitorName }}</span>
    <v-progress-linear color="light-blue" height="16" :model-value="currentPoints" striped>
      <template v-slot:default="{ value }">
        <div class="d-flex justify-space-between w-100">
          <strong class="text-white">{{ currentPoints }} pts</strong>
          <span class="font-weight-thin">faltan {{ pointsLeft }} pts</span>
        </div>
      </template>
    </v-progress-linear>
  </div>
</template>
