interface Tax {
  id: string
}

export default interface Product {
  id: number
  price: number
  quantity: number
  reference?: string
  description?: string
  tax?: Tax
}
