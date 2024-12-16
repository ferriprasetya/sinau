import React, { FormEvent, useState } from 'react'
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Image,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { Button } from '@/Components/Button'
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, router, usePage } from '@inertiajs/react'
import { IoLogOut, IoPersonCircle, IoPersonSharp } from 'react-icons/io5'
import { HiMiniAcademicCap } from 'react-icons/hi2'
import ModalConfirm from '@/Components/ModalConfirm'
import axios from 'axios'
import { Input } from '@/Components/Input'
import clsxm from '@/lib/clsxm'
import { IoIosCloseCircle } from 'react-icons/io'

export default function Navbar() {
  const searchParams = new URLSearchParams(window.location.search).get('search')
  const { auth } = usePage().props as any
  const isLogin = !!auth.user
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isConfirmLogout, setIsConfirmLogout] = React.useState(false)
  const currentRoute = route().current()

  const isMenuActive = (route: string) => {
    if (!currentRoute) return false
    return currentRoute.includes(route)
  }

  const menuItems = [
    {
      label: 'Pertanyaan',
      href: '/question',
      route: 'question',
    },
    {
      label: 'Pengetahuan',
      href: '/knowledge',
      route: 'knowledge',
    },
  ]

  const onLogout = async () => {
    await axios.post(route('logout'))

    setIsConfirmLogout(false)
    router.reload()
  }

  const [search, setSearch] = useState(searchParams ?? '')
  const [showSearchMobile, setShowSearchMobile] = useState(!!searchParams)

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    processSearch()
  }

  const processSearch = (searchValue: string | null = search) => {
    router.get(
      route('question.index'),
      { search: searchValue },
      { replace: true },
    )
  }

  const onCloseSearch = () => {
    setShowSearchMobile(false)
    setSearch('')
    processSearch(null)
  }

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      isBordered
      className='overflow-x-hidden border-neutral-100 bg-neutral-50'
      classNames={{
        wrapper: 'max-w-7xl',
      }}
    >
      <ModalConfirm
        title='Apakah anda yakin ingin keluar?'
        confirmButtonColor='danger'
        confirmText='Keluar'
        isOpen={isConfirmLogout}
        onOpenChange={setIsConfirmLogout}
        onConfirm={onLogout}
      />
      <NavbarContent className={showSearchMobile ? 'max-md:!justify-end' : ''}>
        <NavbarBrand
          as={Link}
          href='/'
          className={showSearchMobile ? 'max-md:flex-grow-0' : ''}
        >
          <Image
            src='/images/logo.svg'
            className='h-8 md:h-8 lg:h-9'
            alt='Logo'
          />
        </NavbarBrand>
        <div className='relative z-10 flex items-center gap-3'>
          <AiOutlineSearch
            className={clsxm(
              'h-6 w-6 cursor-pointer text-foreground-200 md:hidden',
              showSearchMobile && 'hidden',
            )}
            onClick={() => setShowSearchMobile(!showSearchMobile)}
          />
          <IoIosCloseCircle
            className={clsxm(
              'h-6 w-6 cursor-pointer text-foreground-200 md:hidden',
              !showSearchMobile && 'hidden',
            )}
            onClick={onCloseSearch}
          />
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='min-h-6 text-foreground-200 md:hidden'
          />
        </div>
      </NavbarContent>

      <NavbarContent
        justify='start'
        className={clsxm(
          'transition-all md:flex xl:min-w-96',
          showSearchMobile
            ? 'flex max-md:absolute max-md:left-6 max-md:order-first max-md:w-2/3'
            : 'max-md:absolute max-md:left-full',
        )}
      >
        <form onSubmit={onSearch} className='w-full'>
          <Input
            classNames={{
              base: 'max-w-full',
              mainWrapper: 'h-full',
              input: 'text-sm',
              inputWrapper:
                'h-full font-normal text-foreground-200 bg-white shadow-sm group-data-[focus=true]:bg-white/60 group-data-[focus=true]:shadow transition-all',
              clearButton: 'text-foreground-200',
            }}
            placeholder='Cari pertanyaan'
            size='sm'
            startContent={
              <AiOutlineSearch className='ml-3 h-6 w-6 text-foreground-200' />
            }
            value={search}
            onValueChange={setSearch}
          />
        </form>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 md:flex' justify='end'>
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item.label}-${index}`}
            isActive={isMenuActive(item.route)}
            className='text-neutral-500 hover:opacity-70 data-[active]:text-primary'
          >
            <Link className='text-lg font-medium' href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {isLogin ? (
        <NavbarContent justify='end' className='hidden md:flex'>
          <Dropdown>
            <DropdownTrigger>
              <div className='flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-1 transition-colors hover:border-primary hover:bg-secondary-50'>
                {auth.user.profile_url ? (
                  <Image
                    src={auth.user.profile_url}
                    className='h-8 w-8 rounded-full border border-primary'
                  />
                ) : (
                  <IoPersonCircle className='h-8 w-8 text-neutral-500' />
                )}
                <div className='flex items-center gap-1 text-secondary'>
                  <HiMiniAcademicCap className='h-5 w-5' />
                  <p className='text-lg font-semibold'>{auth.user.point}</p>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' disabledKeys={['user']}>
              <DropdownItem key='user' className='p-0 text-neutral-600'>
                <div className='flex flex-col px-2'>
                  <p className='font-medium text-foreground-900'>
                    {auth.user.name}
                  </p>
                  <p className='font-medium'>{auth.user.email}</p>
                </div>
              </DropdownItem>
              <DropdownItem key='profile' className='p-0 text-neutral-600'>
                <Link
                  href='/profile'
                  className='flex items-center gap-2 px-2 py-1.5'
                >
                  <IoPersonSharp className='h-5 w-5' />
                  <p className='text-base font-medium'>Profile</p>
                </Link>
              </DropdownItem>
              <DropdownItem
                key='logout'
                className='p-0 text-danger'
                color='danger'
              >
                <div
                  className='flex items-center gap-2 px-2 py-1.5'
                  onClick={() => setIsConfirmLogout(true)}
                >
                  <IoLogOut className='h-5 w-5 rotate-180' />
                  <p className='text-base font-medium'>Keluar</p>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify='end' className='hidden md:flex'>
          <NavbarItem>
            <Button
              as={Link}
              color='primaryGradient'
              href='/login'
              variant='solid'
            >
              Masuk
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color='primary'
              href='/register'
              variant='bordered'
            >
              Daftar
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* Mobile */}
      <NavbarMenu className='bg-neutral-50'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}-mobile`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className='block w-full rounded-md px-3 py-1 hover:bg-neutral-100'
              href='#'
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        {isLogin ? (
          <>
            <hr />
            <Link
              href='/profile'
              className='flex items-center gap-2 rounded-md border border-transparent px-3 py-1 transition-colors hover:border-primary hover:bg-secondary-50'
            >
              {auth.user.profile_url ? (
                <Image
                  src={auth.user.profile_url}
                  className='h-10 w-10 rounded-full'
                />
              ) : (
                <IoPersonCircle className='h-10 w-10 text-neutral-500' />
              )}
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <p className='font-medium text-foreground-900 opacity-70'>
                    {auth.user.name}
                  </p>

                  <div className='flex items-center gap-1 text-secondary'>
                    <HiMiniAcademicCap className='h-5 w-5' />
                    <p className='text-lg font-semibold'>{auth.user.point}</p>
                  </div>
                </div>
                <p className='-mt-1 font-medium text-neutral-500'>
                  {auth.user.email}
                </p>
              </div>
            </Link>
            <div
              className='flex items-center gap-2 rounded-md px-3 py-1 text-danger hover:bg-danger-100'
              onClick={() => setIsConfirmLogout(true)}
            >
              <IoLogOut className='h-5 w-5 rotate-180' />
              <p className='text-base font-medium'>Keluar</p>
            </div>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Button
                as={Link}
                color='primaryGradient'
                href='/login'
                variant='solid'
                className='w-full'
              >
                Masuk
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                as={Link}
                color='primary'
                href='/register'
                variant='bordered'
                className='w-full'
              >
                Daftar
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </NextUINavbar>
  )
}
