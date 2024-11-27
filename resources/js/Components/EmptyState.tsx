import { Image } from '@nextui-org/react'
import React from 'react'

interface EmptyStateProps {
  isFilter?: boolean
  emptyText?: string
  emptySearchText?: string
}
export default function EmptyState({
  isFilter = false,
  emptySearchText = 'Oops! Pertanyaan yang kamu cari tidak ditemukan',
  emptyText = 'Oops! Belum ada pertanyaan di sini',
}: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Image
        src={
          isFilter
            ? '/images/illustration/empty-search.svg'
            : '/images/illustration/empty.svg'
        }
        className='w-full'
      />
      <p className='text-center text-2xl font-semibold text-neutral-800'>
        {isFilter ? emptySearchText : emptyText}
      </p>
    </div>
  )
}
