import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type Seller from '@/interfaces/services/Seller'
import type Score from '@/interfaces/score'
import sellerService from '@/services/seller'
import { STATUS, TOTAL_POINTS } from '@/utils/constants'

export const useScoreStore = defineStore('score', () => {
  const score = ref<Score[]>([])
  const hasWinner = ref<boolean>(false)
  const points = 3
  const totalPoints = TOTAL_POINTS

  const initScore = async () => {
    const data: Seller[] = await sellerService.get()
    const activeSellers = data.filter((seller) => seller.status === STATUS.active)
    hasWinner.value = false

    score.value = activeSellers.map((seller) => {
      return {
        sellerId: seller.identification,
        sellerName: seller.name,
        score: 0
      }
    })
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
      hasWinner.value = newScore[0].score >= totalPoints
    }
  })

  return { score, initScore, setScore, totalPoints, hasWinner, getFullScore }
})
