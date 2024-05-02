import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CheckIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as RadixCheckbox from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

type PositionType = 'default' | 'left'

export type CheckboxProps = {
  checked: boolean
  id?: string
  label?: string
  onCheckedChange: (checked: boolean) => void
  position?: PositionType
} & Omit<ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'asChild'>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  (
    {
      checked,
      className,
      disabled,
      id,
      label,
      name,
      onCheckedChange,
      position = 'default',
      ...restProps
    },
    ref
  ) => {
    return (
      <Typography
        as={'label'}
        className={`${s.label} ${disabled && s.disabled} ${className}`}
        variant={TypographyVariant.Body2}
      >
        <div className={`${s.checkboxWrapper} ${disabled && s.disabled} ${s[position]}`}>
          <RadixCheckbox.Root
            checked={checked}
            className={s.root}
            disabled={disabled}
            id={id}
            name={name}
            onCheckedChange={onCheckedChange}
            ref={ref}
            required={restProps.required}
          >
            {checked && (
              <RadixCheckbox.Indicator className={s.indicator} forceMount>
                <CheckIcon size={1.8} />
              </RadixCheckbox.Indicator>
            )}
          </RadixCheckbox.Root>
        </div>
        {label}
      </Typography>
    )
  }
)
