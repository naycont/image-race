import http from '@/services/http-common'
import type Seller from '@/interfaces/services/Seller'

const PATH = '/sellers'

const seller = {
  get: async () => {
    try {
      const response = await http.get(PATH)
      const data: Seller[] = response?.data?.length ? response.data : []
      return data
    } catch {
      console.log('error')
      return []
    }
  }
}

export default seller
