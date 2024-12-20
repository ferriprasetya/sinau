import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Transition } from '@headlessui/react'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import { parseDate } from '@internationalized/date'
import { DatePicker, Select, SelectItem } from '@nextui-org/react'
import { FormEventHandler } from 'react'

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: {
  mustVerifyEmail: boolean
  status?: string
  className?: string
}) {
  const user = (usePage().props as any).auth.user

  const { data, setData, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email,
    gender: user.gender,
    birthdate: user.date_of_birth ? parseDate(user.date_of_birth) : null,
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    const payload = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      date_of_birth: data.birthdate ? data.birthdate.toString() : null,
    }
    router.patch(route('profile.update'), payload)
  }

  console.log(data)

  interface EditFormField {
    id: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    required: boolean
    isFocused: boolean
    autoComplete: string
    error?: string
  }

  const editForm: EditFormField[] = [
    {
      id: 'name',
      label: 'Name',
      value: data.name,
      onChange: (e) => setData('name', e.target.value),
      required: true,
      isFocused: true,
      autoComplete: 'name',
      error: errors.name,
    },
    {
      id: 'email',
      label: 'Email',
      value: data.email,
      onChange: (e) => setData('email', e.target.value),
      required: true,
      isFocused: false,
      autoComplete: 'username',
      error: errors.email,
    },
  ]

  const genders = [
    {
      id: 'm',
      label: 'male',
    },
    {
      id: 'f',
      label: 'female',
    },
  ]

  return (
    <section className={className}>
      <header>
        <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          Profile Information
        </h2>

        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
          Update your account&apos;s profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className='mt-6 space-y-6'>
        {editForm.map((field, index) => (
          <div key={index}>
            <InputLabel htmlFor={field.id} value={field.label} />

            <TextInput
              id={field.id}
              className='mt-1 block w-full'
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              isFocused={field.isFocused}
              autoComplete={field.autoComplete}
            />

            <InputError className='mt-2' message={field.error} />
          </div>
        ))}

        <Select
          isRequired
          label='Select Gender'
          placeholder='Pilih gender'
          className='mt-6 text-base font-medium text-foreground-500'
          radius='sm'
          labelPlacement='outside'
          value={data.gender}
          defaultSelectedKeys={data.gender}
          items={genders}
          onChange={(e) => setData('gender', e.target.value)}
          classNames={{
            label: 'text-base font-medium !text-foreground-500',
            description: 'text-sm font-normal text-gray-500',
          }}
        >
          {(education) => (
            <SelectItem key={education.id}>{education.label}</SelectItem>
          )}
        </Select>

        <div>
          <DatePicker
            className='max-w-[284px]'
            label='Birth date'
            labelPlacement='outside'
            value={data.birthdate}
            onChange={(date) => {
              setData('birthdate', date)
            }}
            showMonthAndYearPickers
            errorMessage={errors.birthdate ? 'Please enter a valid date.' : ''}
          />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className='mt-2 text-sm text-gray-800 dark:text-gray-200'>
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method='post'
                as='button'
                className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800'
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className='mt-2 text-sm font-medium text-green-600 dark:text-green-400'>
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className='flex items-center gap-4'>
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter='transition ease-in-out'
            enterFrom='opacity-0'
            leave='transition ease-in-out'
            leaveTo='opacity-0'
          >
            <p className='text-sm text-gray-600 dark:text-gray-400'>Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
