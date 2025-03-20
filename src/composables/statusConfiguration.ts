import { STATUS } from '@/utils/constants'

export default function useStatusColorConfiguration(status: string) {
  const color = status === STATUS.active ? 'primary' : 'secondary'
  return color
}
