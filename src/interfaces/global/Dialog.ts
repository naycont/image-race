export default interface Dialog {
  isActive: boolean
  title: string
  message: string
  closeButton: string
  okButton: string
  type: string
  hasCloseButton: boolean
  data?: string
  params?: string
  isLoading?: boolean
}
