import { STATUS as Status } from '@/utils/constants'

export default interface Seller {
  id: string
  name: string
  identification: string
  observations: string
  status: Status
  score?: number
}
