import Checkbox from '@/Components/Checkbox'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon } from '@/Components/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/Components/EyeSlashFilledIcon'
import { FaGoogle } from 'react-icons/fa'

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

  const submit: FormEventHandler = (e) => {
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

      <div className='text-3xl font-semibold leading-10 text-[#02092f]'>
        Login
      </div>

      <form onSubmit={submit}>
        <div className='mt-10'>
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
            placeholder='Enter your email'
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
              ],
              innerWrapper: ['bg-transparent', 'border-none', 'p-0'],
              inputWrapper: ['p-0', 'border-none'],
            }}
            style={{ border: 'none' }}
          />
        </div>
        <div className='mt-10'>
          <Input
            errorMessage={errors.password}
            name='password'
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            isInvalid={!!errors.password}
            isRequired
            label='password'
            labelPlacement='outside'
            placeholder='Enter your password'
            radius='lg'
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
              ],
              innerWrapper: ['bg-transparent', 'border-none', 'p-0'],
              inputWrapper: ['p-0', 'border-none'],
            }}
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
        </div>

        <div className='mt-4 flex flex-col items-center'>
          <div className='mb-3 flex w-full justify-between'>
            <div className='mb-3 block self-start'>
              <label className='flex items-center'>
                <Checkbox
                  name='remember'
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className='ms-2 text-sm text-gray-600 dark:text-gray-400'>
                  Remember me
                </span>
              </label>
            </div>
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className='mb-3 rounded-md text-sm text-gray-600 underline hover:text-gray-900'
              >
                Forgot your password?
              </Link>
            )}
          </div>

          <Button
            className='mb-2 ms-4 w-full bg-gradient-to-r from-[#5451f2] to-[#9c7dfc] text-lg font-medium leading-7 text-blue-50'
            isLoading={processing}
            onClick={submit}
          >
            Masuk
          </Button>
          <div className='mb-2 flex items-center justify-center text-sm font-medium leading-7 text-[#999db1]'>
            <hr className='' />
            Atau Masuk <hr />
          </div>

          <Button
            className='mb-3 ms-4 w-full border-2 border-[#6118e8] bg-transparent text-lg font-medium leading-7 text-[#6118e8]'
            isLoading={processing}
            onClick={submit}
            startContent={<FaGoogle />}
          >
            Google
          </Button>
          <Link href={route('register')} className='mb-3 text-sm'>
            <span className='text-[#777b8a] no-underline'>
              Belum punya akun?
            </span>
            <span className='text-[#6118e8] no-underline'> Daftar</span>
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
}
