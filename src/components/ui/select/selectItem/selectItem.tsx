import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { TypographyVariant } from '@/common'
import { SelectVariant, Typography } from '@/components'
import * as RadixSelect from '@radix-ui/react-select'

import s from '../select.module.scss'

type SelectItemProps = {
  className?: string
  variant?: SelectVariant
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>

export const SelectItem = forwardRef<ElementRef<typeof RadixSelect.Item>, SelectItemProps>(
  ({ children, className, variant = 'default', ...restProps }, ref) => {
    const typographyVariant =
      variant === 'default' ? TypographyVariant.Body1 : TypographyVariant.Body2

    return (
      <RadixSelect.Item
        className={`${s[`${variant}Paddings`]} ${s.selectItem} ${className}`}
        ref={ref}
        {...restProps}
      >
        <RadixSelect.ItemText>
          <Typography className={s.text} variant={typographyVariant}>
            {children}
          </Typography>
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)
