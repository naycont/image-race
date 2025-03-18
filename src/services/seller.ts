import http from '@/services/http-common'

const PATH = '/sellers'

const seller = {
  get: async () => {
    try {
      const response = await http.get(PATH)
      return response
    } catch {
      console.log('error')
    }
  }
}

export default seller
