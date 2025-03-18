<script lang="ts" setup>
import Progress from '@/components/ranking/Progress.vue'
import { useScoreStore } from '@/stores/score'
import { computed, onMounted } from 'vue'
import { RANKING_COLORS } from '@/utils/constants'

const scoreStore = useScoreStore()

const score = computed(() => scoreStore.score)

const getColor = (index: number) => (RANKING_COLORS[index] ? RANKING_COLORS[index] : 'gray')

onMounted(async () => {
  scoreStore.initScore()
})
</script>
<template>
  <div>
    <Progress
      v-for="(item, index) in score"
      :key="`seller-${item.sellerId}`"
      :competitorName="item.sellerName"
      :color="getColor(index)"
      :score="item.score"
    />
  </div>
</template>
