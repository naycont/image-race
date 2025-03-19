import http from '@/services/http-common'

const PATH = '/invoices'

const invoice = {
  create: async () => {
    try {
      const response = await http.post(PATH)
      console.log(response)
    } catch {
      console.log('error')
      return []
    }
  }
}

export default invoice
