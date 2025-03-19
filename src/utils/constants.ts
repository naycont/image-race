export enum STATUS {
  active = 'active',
  inaactive = 'inactive'
}

export enum InvoiceStatus {
  draft = 'draft',
  open = 'open',
  closed = 'closed',
  void = 'void'
}

export const RANKING_COLORS: string[] = ['#FFD700', '#C0C0C0', '#CD7F32'] // GOLD, SILVER, BRONZE

export const TOTAL_POINTS = 20

export const DIALOG_TYPES = {
  confirm: 'confirm',
  success: 'success'
}
