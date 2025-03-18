<script lang="ts" setup>
import { defineProps } from 'vue'
import { useScoreStore } from '@/stores/score'

const scoreStore = useScoreStore()

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  sellerName: {
    type: String,
    default: ''
  },
  sellerId: {
    type: String,
    default: ''
  }
})

const onLiked = () => {
  scoreStore.setScore(props.sellerId)
}
</script>
<template>
  <v-card flat border="sm">
    <v-img color="surface-variant" height="300" :src="url" cover></v-img>

    <v-card-actions>
      <div class="d-flex justify-space-between w-100 align-center">
        <span>
          <v-icon icon="account_circle"></v-icon>
          {{ sellerName }}
        </span>

        <v-btn flat color="pink" icon="favorite_border" @click="onLiked"></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>
