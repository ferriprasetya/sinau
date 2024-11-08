import React from 'react'
import Navbar from './Navbar'

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
    <div {...attrs}>
      {withNavbar && <Navbar />}
      <div>{children}</div>
    </div>
  )
}
