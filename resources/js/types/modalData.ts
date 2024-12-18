export type ModalData = {
  isOpen: boolean
  title: string
  onOpenChange: (_open: boolean) => void
  content?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}
