import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type Seller from '@/interfaces/services/Seller'
import type Score from '@/interfaces/Score'
import sellerService from '@/services/seller'
import { STATUS, TOTAL_POINTS } from '@/utils/constants'

export const useScoreStore = defineStore('score', () => {
  const score = ref<Score[]>([])
  const winner = ref<Score | null>(null)
  const points = 3
  const totalPoints = TOTAL_POINTS
  const isLoading = ref(false)

  const initScore = async () => {
    try {
      isLoading.value = true
      const data: Seller[] = await sellerService.get()
      const activeSellers = data.filter((seller) => seller.status === STATUS.active)
      winner.value = null

      score.value = activeSellers.map((seller: Seller) => {
        return {
          sellerId: seller.id,
          sellerName: seller.name,
          score: 0
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const setScore = (sellerId: string) => {
    const currentScore = [...score.value]
    score.value = currentScore
      .map((item) => {
        const newScore = item.sellerId === sellerId ? item.score + points : item.score
        return {
          ...item,
          score: newScore
        }
      })
      .sort((itemA, itemB) => {
        return itemB.score - itemA.score
      })
  }

  const getFullScore = () => {
    const currentScore = [...score.value]
    const totalScore = currentScore.reduce(
      (accumulator, currenItem) => accumulator + currenItem.score,
      0
    )
    return totalScore
  }

  watch(score, (newScore) => {
    if (newScore.length) {
      if (newScore[0].score >= totalPoints) {
        winner.value = newScore[0]
      }
    }
  })

  return { score, initScore, setScore, totalPoints, getFullScore, winner, isLoading }
})
