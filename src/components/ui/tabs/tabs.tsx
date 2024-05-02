import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabsProps = { children: ReactNode; label?: string } & ComponentPropsWithoutRef<
  typeof RadixTabs.Root
>

export const Tabs = forwardRef<ElementRef<typeof RadixTabs.Root>, TabsProps>(
  ({ children, className, label, ...restProps }, ref) => {
    return (
      <RadixTabs.Root className={`${s.root} ${className}`} ref={ref} {...restProps}>
        {label && (
          <Typography as={'label'} variant={TypographyVariant.Body2}>
            {label}
          </Typography>
        )}
        <RadixTabs.List className={s.list} loop>
          {children}
        </RadixTabs.List>
      </RadixTabs.Root>
    )
  }
)
