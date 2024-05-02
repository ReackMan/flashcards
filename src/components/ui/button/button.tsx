import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from 'react'

import { ButtonVariant } from '@/common'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: ButtonVariant
} & ComponentPropsWithoutRef<T>

export const PolymorphButton = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: ElementRef<T>
): ReactElement => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    // @ts-expect-error TS2322
    <Component
      className={`${s.button} ${s[variant]} ${fullWidth && s.fullWidth} ${className}`}
      ref={ref}
      {...rest}
    />
  )
}

export const Button = forwardRef(PolymorphButton) as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => ReturnType<typeof PolymorphButton>
