import React from 'react'

const ListBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='fixed w-44 rounded-small border-small border-default-200 bg-white px-1 py-2 dark:border-default-100 md:w-60'>
      {children}
    </div>
  )
}

export default ListBoxWrapper
