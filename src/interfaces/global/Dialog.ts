export default interface Dialog {
  isActive: boolean
  title: string
  message: string
  closeButton: string
  okButton: string
  confirmed: boolean
  type: string
  hasCloseButton: boolean
}
