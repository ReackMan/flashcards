import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ArrowDownIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as RadixSelect from '@radix-ui/react-select'

import s from './select.module.scss'

import { SelectItem } from './selectItem'

export type OptionType = {
  title: string
  value: string
}

export type SelectVariant = 'default' | 'pagination'

export type SelectProps = {
  className?: string
  fullWidth?: boolean
  label?: string
  options: OptionType[]
  placeholder?: ReactNode
  variant?: SelectVariant
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = ({
  className,
  disabled,
  fullWidth,
  label,
  onValueChange,
  options,
  placeholder = 'Select value...',
  value,
  variant = 'default',
  ...restProps
}: SelectProps) => {
  const typographyVariant =
    variant === 'default' ? TypographyVariant.Body1 : TypographyVariant.Body2

  return (
    <RadixSelect.Root
      disabled={disabled}
      onValueChange={onValueChange}
      required={restProps.required}
      value={value}
    >
      {label && (
        <Typography
          as={'label'}
          className={`${s.text} ${disabled && s.disabled}`}
          variant={typographyVariant}
        >
          {label}
        </Typography>
      )}
      <RadixSelect.Trigger
        aria-label={'select'}
        className={`
          ${s.trigger}
          ${s[`${variant}Paddings`]}
          ${s[variant]}
          ${fullWidth && s.fullWidth}
          ${className}`}
      >
        <Typography className={s.text} variant={typographyVariant}>
          <RadixSelect.Value className={s.value} placeholder={placeholder} />
        </Typography>
        <RadixSelect.Icon className={s.icon}>
          <ArrowDownIcon size={1.6} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={s.content} position={'popper'}>
          <RadixSelect.Viewport>
            {options.map(option => (
              <SelectItem key={option.value} value={option.value} variant={variant}>
                {option.title}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
