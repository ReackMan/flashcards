import { ComponentPropsWithoutRef } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'

import s from './tabItem.module.scss'

type TabItemProps = ComponentPropsWithoutRef<typeof RadixTabs.Trigger>

export const TabItem = ({ children, className, disabled, value }: TabItemProps) => {
  return (
    <RadixTabs.Trigger className={`${s.trigger} ${className}`} disabled={disabled} value={value}>
      {children}
    </RadixTabs.Trigger>
  )
}
