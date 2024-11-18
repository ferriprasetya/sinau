import { Link } from '@inertiajs/react'
import { Image } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className='relative'>
      <div className='absolute left-0 top-0 z-10 h-full w-full bg-gray-50 opacity-50'></div>
      <img
        src='images/auth/atas.png'
        alt='atas'
        className='absolute top-0 z-0 w-full'
      />
      <img
        src='images/auth/bawah.png'
        alt='atas'
        className='absolute bottom-0 z-0 w-full'
      />
      <div className='relative z-40 flex min-h-screen flex-col items-center justify-center pt-6 dark:bg-gray-900 sm:pt-0'>
        <div>
          <Link href='/'>
            <Image src='/images/logo.svg' className='h-16 md:h-20' alt='Logo' />
          </Link>
        </div>

        <div className='mt-6 w-full max-w-2xl overflow-hidden bg-white px-6 py-6 shadow-md dark:bg-gray-800 sm:rounded-3xl sm:px-12 sm:py-12'>
          {children}
        </div>
      </div>
    </div>
  )
}
