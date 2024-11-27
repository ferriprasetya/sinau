import React from 'react'
import Navbar from './Navbar'
import clsxm from '@/lib/clsxm'

type LayoutProps = {
  withNavbar?: boolean
  children: React.ReactNode
}
export default function Layout({
  withNavbar = true,
  children,
  ...attrs
}: LayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...attrs} className={clsxm('pb-10', attrs.className)}>
      {withNavbar && <Navbar />}
      <div>{children}</div>
    </div>
  )
}
