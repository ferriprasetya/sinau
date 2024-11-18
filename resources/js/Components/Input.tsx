import { extendVariants, Input as NextUIInput } from '@nextui-org/react'

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        label: '!text-neutral-900 font-medium',
        input: [
          'text-neutral-500',
          'placeholder:text-neutral-500 ',
          'rounded-xl',
          'focus:ring-0',
          'active:ring-0',
          'border-0',
        ],
        innerWrapper: ['bg-transparent', 'border-none', 'p-0'],
        inputWrapper: [
          'p-0',
          'border-none bg-neutral-50 data-[hover=true]:bg-neutral-100 group-data-[focus=true]:bg-neutral-50',
        ],
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'lg',
  },
})
