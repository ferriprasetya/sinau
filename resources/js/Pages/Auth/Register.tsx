import { EyeFilledIcon } from '@/Components/EyeFilledIcon'
import { EyeSlashFilledIcon } from '@/Components/EyeSlashFilledIcon'

import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { FormEventHandler, useState } from 'react'

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
      <div className='text-3xl font-semibold leading-10 text-[#02092f]'>
        Register
      </div>
      <form onSubmit={submit}>
        <div className='mt-10'>
          <Input
            errorMessage={errors.name}
            name='name'
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            isInvalid={!!errors.name}
            isRequired
            type='name'
            label='Name'
            labelPlacement='outside'
            placeholder='Enter your Name'
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
        </div>
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

        <div className='mt-10'>
          <Input
            errorMessage={errors.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            name='password_confirmation'
            value={data.password_confirmation}
            isInvalid={!!errors.password_confirmation}
            isRequired
            label='confirm password'
            labelPlacement='outside'
            placeholder='confirm your password'
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

        <div className='mt-5 flex flex-col items-center justify-center'>
          <Button
            className='mb-3 w-full bg-gradient-to-r from-[#5451f2] to-[#9c7dfc] text-lg font-medium leading-7 text-blue-50'
            isLoading={processing}
            onClick={submit}
          >
            Register
          </Button>
          <Link href={route('login')} className='mb-3 text-sm'>
            <span className='text-[#777b8a] no-underline'>
              Sudah punya akun?
            </span>
            <span className='text-[#6118e8] no-underline'> Masuk</span>
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
}
