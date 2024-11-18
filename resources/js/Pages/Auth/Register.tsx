import { Button } from '@/Components/Button'
import { EyeFilledIcon } from '@/Components/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/Components/EyeSlashFilledIcon'
import { Input } from '@/Components/Input'

import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { FaGoogle } from 'react-icons/fa6'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <GuestLayout>
      <Head title='Register' />
      <div className='mb-8 text-3xl font-semibold leading-10 text-foreground-900 md:mb-12'>
        Daftar
      </div>
      <form onSubmit={submit} className='flex flex-col gap-6'>
        <Input
          errorMessage={errors.name}
          name='name'
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          isInvalid={!!errors.name}
          isRequired
          type='name'
          label='Nama'
          labelPlacement='outside'
          placeholder='Masukkan nama anda'
          variant='flat'
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 ',
              'placeholder:text-neutral-500 ',
              'rounded-xl',
              'focus:ring-0',
              'active:ring-0',
              'px-3',
            ],
            innerWrapper: ['bg-transparent', 'border-none', 'p-0'],
            inputWrapper: ['p-0', 'border-none'],
          }}
          style={{ border: 'none' }}
        />
        <Input
          errorMessage={errors.email}
          name='email'
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          isInvalid={!!errors.email}
          isRequired
          type='email'
          label='Email'
          labelPlacement='outside'
          placeholder='Masukkan email anda'
        />

        <Input
          errorMessage={errors.password}
          name='password'
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          isInvalid={!!errors.password}
          isRequired
          label='Password'
          labelPlacement='outside'
          placeholder='Masukkan password anda'
          endContent={
            <button
              className='mr-2 focus:outline-none'
              type='button'
              onClick={toggleVisibility}
              aria-label='toggle password visibility'
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
              ) : (
                <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          style={{ border: 'none' }}
        />

        <Input
          errorMessage={errors.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          name='password_confirmation'
          value={data.password_confirmation}
          isInvalid={!!errors.password_confirmation}
          isRequired
          label='Konfirmasi Password'
          labelPlacement='outside'
          placeholder='Masukkan ulang password anda'
          endContent={
            <button
              className='mr-2 focus:outline-none'
              type='button'
              onClick={toggleVisibility}
              aria-label='toggle password visibility'
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
              ) : (
                <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          style={{ border: 'none' }}
        />

        <div className='flex flex-col items-center justify-center'>
          <Button
            color='primaryGradient'
            className='w-full text-lg font-medium'
            isLoading={processing}
            onClick={submit}
          >
            Daftar
          </Button>

          <div className='flex w-full items-center justify-center text-sm font-medium leading-7 text-neutral-600'>
            <hr className='w-full' />
            <span className='inline-block text-nowrap px-2'>
              Atau daftar dengan
            </span>
            <hr className='w-full' />
          </div>

          <a className='block w-full' href={route('auth.google')}>
            <Button
              variant='bordered'
              color='primary'
              className='w-full text-lg font-medium'
              startContent={<FaGoogle />}
            >
              Google
            </Button>
          </a>
        </div>
        <div className='mx-auto text-sm'>
          <span className='text-[#777b8a] no-underline'>Sudah punya akun?</span>
          <Link href={route('login')} className='text-secondary no-underline'>
            {' '}
            Masuk
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
}
