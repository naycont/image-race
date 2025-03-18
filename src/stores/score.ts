import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Seller from '@/interfaces/services/Seller'
import type Score from '@/interfaces/score'
import sellerService from '@/services/seller'
import { STATUS } from '@/utils/constants'

export const useScoreStore = defineStore('score', () => {
  const score = ref<Score[]>([])
  const points = 3

  const initScore = async () => {
    const data: Seller[] = await sellerService.get()
    const activeSellers = data.filter((seller) => seller.status === STATUS.active)
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

  return { score, initScore, setScore }
})
