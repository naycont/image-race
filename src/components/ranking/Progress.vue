<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { useScoreStore } from '@/stores/score'
import { TOTAL_POINTS } from '@/utils/constants'

const scoreStore = useScoreStore()

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
    default: TOTAL_POINTS
  },
  color: {
    type: String,
    default: '#ccc'
  }
})

const currentPercent = computed(() => {
  return (props.score * 100) / scoreStore.totalPoints
})

const pointsLeft = computed(() => {
  const diff = scoreStore.totalPoints - props.score
  const result = diff < 0 ? 0 : diff
  return result
})
</script>
<template>
  <div class="d-flex flex-column w-100 px-2 mb-1">
    <div class="d-flex">
      <v-icon icon="account_circle" :color="color"></v-icon>
      <span class="ml-1">{{ competitorName }}</span>
    </div>

    <v-progress-linear :color="color" height="16" :model-value="currentPercent" striped>
      <template v-slot:default>
        <div class="d-flex justify-space-between w-100">
          <span>{{ score }} pts</span>
          <span class="font-weight-thin">faltan {{ pointsLeft }} pts</span>
        </div>
      </template>
    </v-progress-linear>
  </div>
</template>
