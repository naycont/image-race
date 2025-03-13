<script lang="ts" setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  competitorName: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    default: 20
  },
  color: {
    type: String,
    default: '#ccc'
  }
})

const pointsLeft = computed(() => props.goal - props.score)
</script>
<template>
  <div class="d-flex flex-column w-100 px-2 mt-1">
    <div class="d-flex">
      <v-icon icon="account_circle" :color="color"></v-icon>
      <span class="ml-1">{{ competitorName }}</span>
    </div>

    <v-progress-linear :color="color" height="16" :model-value="score" striped>
      <template v-slot:default="{ value }">
        <div class="d-flex justify-space-between w-100">
          <span>{{ score }} pts</span>
          <span class="font-weight-thin">faltan {{ pointsLeft }} pts</span>
        </div>
      </template>
    </v-progress-linear>
  </div>
</template>
