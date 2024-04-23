import { ComponentPropsWithoutRef } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as SliderPrimitive from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = { label: string } & ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

export const Slider = ({ className, label, ...restProps }: SliderProps) => {
  return (
    <div>
      {label && (
        <Typography as={'label'} variant={TypographyVariant.Body2}>
          {label}
        </Typography>
      )}
      <div className={s.container}>
        <Typography as={'div'} className={s.valueWrapper} variant={TypographyVariant.Body1}>
          {restProps?.value?.[0]}
        </Typography>
        <SliderPrimitive.Root className={`${s.root} ${className}`} {...restProps}>
          <SliderPrimitive.Track className={s.track}>
            <SliderPrimitive.Range className={s.range} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb aria-label={'Value min'} className={s.thumb} />
          <SliderPrimitive.Thumb aria-label={'Value max'} className={s.thumb} />
        </SliderPrimitive.Root>
        <Typography as={'div'} className={s.valueWrapper} variant={TypographyVariant.Body1}>
          {restProps?.value?.[1]}
        </Typography>
      </div>
    </div>
  )
}
