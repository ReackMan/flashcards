import { ComponentPropsWithoutRef, ElementRef, ReactElement, forwardRef } from 'react'

import s from './card.module.scss'

export const Card = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...restProps }, ref): ReactElement => {
    return <div className={`${s.card} ${className}`} ref={ref} {...restProps} />
  }
)
