import { ModalData } from '@/types/modalData'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonProps,
} from '@nextui-org/react'
import { ReactNode } from 'react'
import { Button } from './Button'

export default function ModalConfirm({
  isOpen,
  onOpenChange,
  title,
  content,
  confirmText = 'Simpan',
  confirmButtonColor = 'primaryGradient',
  cancelText = 'Batal',
  onConfirm = () => {},
  onCancel = () => {},
  children,
}: ModalData & {
  children?: ReactNode
  confirmButtonColor?: ButtonProps['color'] | 'primaryGradient'
}) {
  return (
    <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>{children ? children : content}</ModalBody>
            <ModalFooter>
              <Button
                color='default'
                variant='bordered'
                onPress={onClose}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
              <Button
                color={confirmButtonColor}
                onPress={onClose}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
