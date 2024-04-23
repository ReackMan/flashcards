import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type TabsProps = { children: ReactNode; label?: string } & ComponentPropsWithoutRef<
  typeof RadixTabs.Root
>

export const Tabs = ({ children, className, label, ...restProps }: TabsProps) => {
  return (
    <RadixTabs.Root className={`${s.root} ${className}`} {...restProps}>
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
