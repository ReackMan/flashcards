import { ComponentPropsWithoutRef, ElementType } from 'react'

import { TypographyVariant } from '@/common'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  variant?: TypographyVariant
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { as: Component = 'p', className, variant = TypographyVariant.Body1, ...rest } = props

  return <Component className={`${s.typography} ${s[variant]} ${className}`} {...rest} />
}
