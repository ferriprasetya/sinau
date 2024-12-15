import { Listbox, ListboxItem } from '@nextui-org/react'
import { FaListUl } from 'react-icons/fa6'
import { FaArrowUp } from 'react-icons/fa'
import { BsPersonLinesFill } from 'react-icons/bs'
import ListBoxWrapper from '../ListBoxWrapper'

function Menu() {
  return (
    <ListBoxWrapper>
      <Listbox variant='faded' aria-label='Listbox menu with icons'>
        <ListboxItem
          key='new'
          startContent={
            <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-primary-50'>
              <FaListUl className='fill-primary-600' />
            </div>
          }
        >
          Semua pertanyaan
        </ListboxItem>
        <ListboxItem
          key='copy'
          startContent={
            <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-success-50'>
              <FaArrowUp className='fill-success-600' />
            </div>
          }
        >
          Pertanyaan Didukung
        </ListboxItem>
        <ListboxItem
          key='edit'
          startContent={
            <div className='flex h-8 w-8 items-center justify-center rounded-sm bg-info-50'>
              <BsPersonLinesFill className='fill-info-600' />
            </div>
          }
        >
          Pertanyaan saya
        </ListboxItem>
      </Listbox>
    </ListBoxWrapper>
  )
}

export default Menu
