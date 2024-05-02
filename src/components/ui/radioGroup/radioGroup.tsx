import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Radio from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { RadioItem, RadioItemProps } from './radioItem'

export type RadioGroupProps = { options: RadioItemProps[] } & ComponentPropsWithoutRef<
  typeof Radio.Root
>
export const RadioGroup = forwardRef<ElementRef<typeof Radio.Root>, RadioGroupProps>(
  ({ className, options, ...restProps }, ref) => {
    return (
      <Radio.Root className={`${s.root} ${className}`} ref={ref} {...restProps}>
        {options.map(item => (
          <RadioItem key={item.value} {...item} />
        ))}
      </Radio.Root>
    )
  }
)
