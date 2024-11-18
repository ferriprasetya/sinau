import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'
import { Checkbox } from '@nextui-org/react'
import { EyeFilledIcon } from '@/Components/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/Components/EyeSlashFilledIcon'
import { FaGoogle } from 'react-icons/fa'
import { Button } from '@/Components/Button'
import { Input } from '@/Components/Input'

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string
  canResetPassword: boolean
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <GuestLayout>
      <Head title='Log in' />

      {status && (
        <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>
      )}

      <div className='mb-8 text-3xl font-semibold leading-10 text-foreground-900 md:mb-12'>
        Login
      </div>

      <form onSubmit={submit} className='flex flex-col gap-6'>
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
                <EyeSlashFilledIcon className='pointer-events-none text-2xl text-neutral-500' />
              ) : (
                <EyeFilledIcon className='pointer-events-none text-2xl text-neutral-500' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          style={{ border: 'none' }}
        />

        <div className='flex flex-col items-center'>
          <div className='mb-3 flex w-full justify-between'>
            <Checkbox
              name='remember'
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className='mb-3'
              classNames={{
                label: 'text-gray-600 hover:text-gray-900',
              }}
            >
              Ingat saya
            </Checkbox>
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className='mb-3 rounded-md text-sm text-gray-600 underline hover:text-gray-900'
              >
                Lupa password?
              </Link>
            )}
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Button
              color='primaryGradient'
              className='w-full text-lg font-medium'
              isLoading={processing}
              onClick={submit}
            >
              Masuk
            </Button>

            <div className='flex w-full items-center justify-center text-sm font-medium leading-7 text-neutral-600'>
              <hr className='w-full' />
              <span className='inline-block text-nowrap px-2'>
                Atau masuk dengan
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
        </div>
        <div className='mx-auto text-sm'>
          <span className='text-[#777b8a]'>Belum punya akun?</span>
          <Link href={route('register')} className='text-secondary'>
            {' '}
            Daftar
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
}
