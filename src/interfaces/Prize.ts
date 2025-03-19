export interface PrizeItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Prize {
  id: string
  date: string
  status: string
  total: string
  items?: PrizeItem
}
