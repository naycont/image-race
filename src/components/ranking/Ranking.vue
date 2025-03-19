<script lang="ts" setup>
import Progress from '@/components/ranking/Progress.vue'
import { useScoreStore } from '@/stores/score'
import { computed, onMounted, defineProps, ref } from 'vue'
import { RANKING_COLORS, TOP_RANKING } from '@/utils/constants'

const props = defineProps({
  preview: {
    type: Boolean,
    default: false
  }
})

const isPreview = ref<boolean>(props.preview)

const scoreStore = useScoreStore()

const score = computed(() => scoreStore.score)

const isScoreLoading = computed(() => scoreStore.isLoading)

const items = computed(() => {
  if (score?.value.length && isPreview.value) {
    return score.value.slice(0, TOP_RANKING)
  } else {
    return score.value
  }
})

const getColor = (index: number) => (RANKING_COLORS[index] ? RANKING_COLORS[index] : 'secondary')

onMounted(async () => {
  scoreStore.initScore()
})
</script>
<template>
  <div class="d-flex flex-column">
    <template v-if="isScoreLoading">
      <v-skeleton-loader
        type="list-item"
        v-for="line in 3"
        :key="`loader-${line}`"
      ></v-skeleton-loader>
    </template>

    <template v-else>
      <Progress
        v-for="(item, index) in items"
        :key="`seller-${item.sellerId}`"
        :competitorName="item.sellerName"
        :color="getColor(index)"
        :score="item.score"
      />

      <div class="d-flex justify-end">
        <v-btn
          class="text-body-2 font-weight-thin px-1"
          density="compact"
          variant="text"
          @click="isPreview = !isPreview"
        >
          {{ isPreview ? 'ver mas...' : 'ver menos...' }}
        </v-btn>
      </div>
    </template>
  </div>
</template>
