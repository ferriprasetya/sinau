import React from 'react'
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
import { Link, usePage } from '@inertiajs/react'
import { IoLogOut, IoPersonCircle, IoPersonSharp } from 'react-icons/io5'
import { HiMiniAcademicCap } from 'react-icons/hi2'

export default function Navbar() {
  const isLogin = !!(usePage().props as any).auth.user
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const currentRoute = route().current()

  const isMenuActive = (route: string) => {
    if (!currentRoute) return false
    return route.includes(currentRoute)
  }

  const menuItems = [
    {
      label: 'Beranda',
      href: '/',
      route: 'home',
    },
    {
      label: 'Pertanyaan',
      href: '/pertanyaan',
      route: 'question.index',
    },
    {
      label: 'Pengetahuan',
      href: '/pengetahuan',
      route: 'knowledge.index',
    },
  ]

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      isBordered
      className='border-neutral-100 bg-neutral-50'
    >
      <NavbarContent>
        <NavbarBrand as={Link} href='/'>
          <Image src='/images/logo.svg' className='h-8 md:h-9' alt='Logo' />
        </NavbarBrand>
        <div className='flex items-center gap-3'>
          <AiOutlineSearch className='h-6 w-6 cursor-pointer text-foreground-200 md:hidden' />
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='min-h-6 text-foreground-200 md:hidden'
          />
        </div>
      </NavbarContent>

      <NavbarContent className='hidden gap-4 md:flex' justify='center'>
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
                <IoPersonCircle className='h-8 w-8 text-neutral-500' />
                <div className='flex items-center gap-1 text-secondary'>
                  <HiMiniAcademicCap className='h-5 w-5' />
                  <p className='text-lg font-semibold'>431</p>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions'>
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
                <Link
                  className='flex items-center gap-2 px-2 py-1.5'
                  method='post'
                  href={route('logout')}
                >
                  <IoLogOut className='h-5 w-5 rotate-180' />
                  <p className='text-base font-medium'>Logout</p>
                </Link>
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
              className='flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-1 transition-colors hover:border-primary hover:bg-secondary-50'
            >
              <IoPersonCircle className='h-8 w-8 text-neutral-500' />
              <div className='flex items-center gap-1 text-secondary'>
                <HiMiniAcademicCap className='h-5 w-5' />
                <p className='text-lg font-semibold'>431</p>
              </div>
            </Link>
            <Link
              className='flex items-center gap-2 rounded-md px-3 py-1 text-danger hover:bg-danger-100'
              method='post'
              href={route('logout')}
            >
              <IoLogOut className='h-5 w-5 rotate-180' />
              <p className='text-base font-medium'>Logout</p>
            </Link>
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
