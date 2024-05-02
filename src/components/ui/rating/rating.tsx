import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { RatingEmptyIcon, RatingFilledIcon } from '@/assets'

import s from './rating.module.scss'

type RatingProps = {
  className?: string
  maxRating?: number
  rating: number
  size?: number
} & ComponentPropsWithoutRef<'div'>

export const Rating = forwardRef<ElementRef<'div'>, RatingProps>(
  ({ className, maxRating = 5, rating, size = 1.6, ...restProps }, ref) => {
    const stars = [...Array(maxRating)].map((_, index) => index + 1)

    return (
      <div className={`${s.root} ${className}`} ref={ref} {...restProps}>
        {stars.map((star, index) => {
          return rating >= star ? (
            <RatingFilledIcon color={'var(--color-warning-300)'} key={index} size={size} />
          ) : (
            <RatingEmptyIcon color={'var(--color-warning-300)'} key={index} size={size} />
          )
        })}
      </div>
    )
  }
)
