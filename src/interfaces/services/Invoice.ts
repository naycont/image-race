import type Product from '@/interfaces/Product'
import type { InvoiceStatus } from '@/utils/constants'

export enum PaymentMethod {
  'cash' = 'cash',
  'debit-card' = 'debit-card',
  'credit-card' = 'credit-card',
  'service-card' = 'service-card',
  'transfer' = 'transfer',
  'check' = 'check',
  'electronic-wallet' = 'electronic-wallet',
  'electronic-money' = 'electronic-money',
  'grocery-voucher' = 'grocery-voucher',
  'dation-payment' = 'dation-payment',
  'subrogation-payment' = 'subrogation-payment',
  'allocation-payment' = 'allocation-payment',
  'forgiveness' = 'forgiveness',
  'compensation' = 'compensation',
  'novation' = 'novation',
  'misunderstanding' = 'misunderstanding',
  'debt-remission' = 'debt-remission',
  'prescription-or-expiration' = 'prescription-or-expiration',
  'creditor-satisfaction' = 'creditor-satisfaction'
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
  paymentMethod?: PaymentMethod
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
  client: number | { id: string }
  seller: number | { id: string }
  accountNumber?: string
  cfdiUse?: string
  stamp?: Stamp
  paymentType?: string
  regimeClient?: string
  status?: InvoiceStatus
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
