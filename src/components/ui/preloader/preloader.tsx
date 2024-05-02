import { ComponentPropsWithoutRef, ElementRef, ReactElement, forwardRef } from 'react'

import { Loading } from '@/assets'

import s from './preloader.module.scss'

export const Preloader = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...restProps }, ref): ReactElement => {
    return (
      <div className={`${s.root} ${className}`} ref={ref} {...restProps}>
        <Loading />
      </div>
    )
  }
)
