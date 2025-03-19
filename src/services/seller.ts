import http from '@/services/http-common'
import type Seller from '@/interfaces/services/Seller'

const PATH = '/sellers'

const seller = {
  get: async (): Promise<Array<Seller>> => {
    try {
      const response = await http.get(PATH)
      const data: Seller[] = response?.data?.length ? response.data : []
      return data
    } catch {
      console.log('error')
      return []
    }
  },
  post: async (seller: Seller): Promise<Seller | null> => {
    try {
      const response = await http.post(`${PATH}`, seller)
      const data: Seller = response?.data ? response.data : null
      return data
    } catch {
      console.log('error')
      return null
    }
  },
  put: async (sellerId: string, seller: Seller): Promise<Seller | null> => {
    try {
      const response = await http.put(`${PATH}/${sellerId}`, seller)
      const data: Seller = response?.data ? response.data : null
      return data
    } catch {
      console.log('error')
      return null
    }
  }
}

export default seller
