import { ComponentPropsWithoutRef, ElementRef, ReactElement, forwardRef } from 'react'

import s from './page.module.scss'

export const Page = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...restProps }, ref): ReactElement => {
    return <div className={`${s.root} ${className}`} ref={ref} {...restProps} />
  }
)
