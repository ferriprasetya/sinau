import * as React from 'react'

import clsxm from '@/lib/clsxm'

export enum TypographyVariant {
  h4,
  h5,
  h6,
  t,
  bl,
  bm,
  bs,
  c,
}

enum FontVariant {
  rubik,
}

enum FontWeight {
  extrabold,
  bold,
  semibold,
  medium,
  regular,
}

type TypographyProps<T extends React.ElementType> = {
  as?: T
  className?: string
  weight?: keyof typeof FontWeight
  font?: keyof typeof FontVariant
  variant?: keyof typeof TypographyVariant
  children: React.ReactNode
}

export default function Typography<T extends React.ElementType>({
  as,
  children,
  weight = 'regular',
  className,
  font = 'rubik',
  variant = 'bm',
  ...props
}: TypographyProps<T> &
  Omit<React.ComponentProps<T>, keyof TypographyProps<T>>) {
  const Component = as || 'p'
  return (
    <Component
      className={clsxm(
        // *=============== Font Type ==================
        'text-black',
        [
          font === 'rubik' && [
            'font-rubik',
            [
              weight === 'extrabold' && 'font-extrabold',
              weight === 'regular' && 'font-normal',
              weight === 'medium' && 'font-medium',
              weight === 'bold' && 'font-bold',
              weight === 'semibold' && 'font-semibold',
            ],
          ],
        ],
        // *=============== Font Variants ==================
        [
          variant === 'h4' && [
            clsxm(
              'text-[48px] leading-[64px]',
              'max-md:text-[30px] max-md:leading-[40px]',
            ),
          ],
          variant === 'h5' && [
            clsxm(
              'text-[32px] leading-[36px]',
              'max-md:text-[24px] max-md:leading-[32px]',
            ),
          ],
          variant === 'h6' && [
            clsxm(
              'text-[28px] leading-[32px]',
              'max-md:text-[20px] max-md:leading-[28px]',
            ),
          ],
          variant === 't' && [
            clsxm(
              'text-[20px] leading-[24px]',
              'max-md:text-[18px] max-md:leading-[24px]',
            ),
          ],
          variant === 'bl' && [
            clsxm(
              'text-[18px] leading-[24px]',
              'max-md:text-[16px] max-md:leading-[20px]',
            ),
          ],
          variant === 'bm' && [
            clsxm(
              'text-[16px] leading-[24px]',
              'max-md:text-[14px] max-md:leading-[18px]',
            ),
          ],
          variant === 'bs' && [
            clsxm(
              'text-[14px] leading-[18px]',
              'max-md:text-[12px] max-md:leading-[16px]',
            ),
          ],
          variant === 'c' && [
            clsxm(
              'text-[12px] leading-[16px]',
              'max-md:leading-[14 px] max-md:text-[10px]',
            ),
          ],
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
