import ModalConfirm from '../ModalConfirm'
import { router } from '@inertiajs/react'

export default function ModalVoteLogin({
  showModal = false,
  setShowModal = () => {},
}: {
  showModal?: boolean
  setShowModal?: (_showModal: boolean) => void
}) {
  const toggleConfirmLogin = () => {
    setShowModal(!showModal)
  }
  const redirectToLogin = () => {
    const urlRedirect = window.location
      .toString()
      .split(window.location.host)[1]
    router.visit('/login?redirectTo=' + urlRedirect)
  }

  return (
    <ModalConfirm
      isOpen={showModal}
      onOpenChange={toggleConfirmLogin}
      title='Harap login untuk melakukan dukungan'
      content='Anda tidak dapat melakukan dukungan jika belum login. Harap login terlebih dahulu untuk melanjutkan.'
      confirmText='Login'
      confirmButtonColor='primaryGradient'
      onConfirm={redirectToLogin}
    />
  )
}
