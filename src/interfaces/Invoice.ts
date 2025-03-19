import type Product from '@/interfaces/Product'

enum Status {
  draft = 'draft',
  open = 'open'
}

interface Stamp {
  stampDate: string
  uuid: string
  satSeal: string
  cfdSeal: string
  expeditionPlace: string
  datetime: string
  certificateNumber: string
}

interface Payment {
  date: string
  account: { id: string }
  amount?: number
  paymentMethod?: string
  annotations?: string
  observations?: string
  retentions?: { id: string; amount: number }
  currency?: { code: string; exchangeRate: number }
}

export default interface Invoice {
  paymentMethod: string
  items: Array<Product>
  dueDate: string
  date: string
  client: { id: string }
  seller: { id: string }
  accountNumber?: string
  cfdiUse?: string
  stamp?: Stamp
  paymentType?: string
  regimeClient?: string
  status?: Status
  payments?: Array<Payment>
  estimate?: string
  termsConditions?: string
  anotation?: string
  observations?: string
  priceList?: number | { [id: string]: string }
  currency?: { [id: string]: string }
  retentions?: Array<{ id: string; amount: number }>
  warehouse?: number | { [id: string]: string }
  remissions?: Array<{ id: string; items: Array<{ id: string }> }>
  costCenter?: number | { [id: string]: string }
  comments?: Array<string>
  periodicity?: string
}
