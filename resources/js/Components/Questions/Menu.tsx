import { Listbox, ListboxItem } from '@nextui-org/react'
import { useState } from 'react'
import { usePage } from '@inertiajs/react'

function Menu({
  menuOptions,
  selectedMenu,
  onChangeMenu,
}: {
  menuOptions: {
    key: string
    label: string
    icon: JSX.Element
  }[]
  selectedMenu: string
  onChangeMenu: (value: string) => void
}) {
  const { auth } = usePage().props as any
  const isLogin = !!auth.user
  const [selectedMenuState, setSelectedMenu] = useState(
    isLogin ? selectedMenu : '',
  )

  return (
    <div className='fixed mt-8 w-44 rounded-small border-small border-default-200 bg-white px-1 py-2 dark:border-default-100 md:w-60'>
      <Listbox variant='faded' aria-label='Question menu' items={menuOptions}>
        {(menu) => (
          <ListboxItem
            key={menu.key}
            startContent={menu.icon}
            onClick={() => {
              if (menu.key !== selectedMenuState && isLogin) {
                setSelectedMenu(menu.key)
                onChangeMenu(menu.key)
              }
            }}
            classNames={{
              base: menu.key === selectedMenuState ? 'bg-neutral-50' : '',
            }}
            isDisabled={!isLogin && menu.key !== ''}
          >
            {menu.label}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}

export default Menu
