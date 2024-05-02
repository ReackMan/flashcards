import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as Radio from '@radix-ui/react-radio-group'

import s from './radioItem.module.scss'

export type RadioItemProps = {
  title: string
} & ComponentPropsWithoutRef<typeof Radio.Item>

export const RadioItem = forwardRef<ElementRef<typeof Radio.Item>, RadioItemProps>(
  ({ disabled, title, value }, ref) => {
    return (
      <Typography
        as={'label'}
        className={`${s.label} ${disabled && s.disabled}`}
        variant={TypographyVariant.Body2}
      >
        <Radio.Item className={s.item} disabled={disabled} ref={ref} value={value}>
          <Radio.Indicator className={s.indicator} />
        </Radio.Item>
        <Typography
          as={'span'}
          className={`${s.title} ${disabled && s.disabledTitle}`}
          variant={TypographyVariant.Body2}
        >
          {title}
        </Typography>
      </Typography>
    )
  }
)
