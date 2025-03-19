import type Seller from '@/interfaces/services/Seller'

export default interface SellerDialog {
  title: string
  seller: Seller | null
}
