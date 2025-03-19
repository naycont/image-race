export enum STATUS {
  active = 'active',
  inactive = 'inactive'
}

export enum InvoiceStatus {
  draft = 'draft',
  open = 'open',
  closed = 'closed',
  void = 'void'
}

export const RANKING_COLORS: string[] = ['#FFD700', '#C0C0C0', '#CD7F32'] // GOLD, SILVER, BRONZE

export const TOP_RANKING = 3

export const TOTAL_POINTS = 20

export const DIALOG_TYPES = {
  confirm: 'confirm',
  success: 'success'
}

export const CRUD_ACTIONS = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  toggleStatus: 'toggleStatus'
}
