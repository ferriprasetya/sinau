import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
  isText?: boolean
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  isText = true,
}) => {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <button
      onClick={handleBack}
      className={`${className} flex items-center p-2 text-gray-600 transition-colors duration-200 hover:text-gray-800 focus:outline-none`}
      aria-label='Kembali ke halaman sebelumnya'
    >
      <div>
        <ArrowLeft className='h-6 w-6' />
      </div>
      {isText && <div>Kembali</div>}
    </button>
  )
}

export default BackButton
