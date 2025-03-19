import type Invoice from '@/interfaces/services/Invoice'
import http from '@/services/http-common'

const PATH = '/invoices'

const invoiceService = {
  create: async (data: Invoice) => {
    try {
      const response = await http.post(PATH, data)
      const responseData = response.data ? response.data : {}

      return responseData
    } catch {
      console.log('error')
      return []
    }
  }
}

export default invoiceService
