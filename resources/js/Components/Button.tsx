'use client'
import { extendVariants, Button as NextUIButton } from '@nextui-org/react'

export const Button = extendVariants(NextUIButton, {
  variants: {
    color: {
      primaryGradient: 'bg-gradient-primary text-neutral-50',
    },
  },
  defaultVariants: {
    color: 'primaryGradient',
    radius: 'sm',
  },
})
