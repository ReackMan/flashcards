import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from './dropdownItem.module.scss'

import { dropdownAnimations } from '../dropdownMenuAnimations'

export type DropdownItemProps = {
  children: ReactNode
  className?: string
  onSelect?: (event: Event) => void
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Item>

export const DropdownItem = ({ children, className, onSelect }: DropdownItemProps) => {
  const onSelectHandler = (e: Event) => {
    onSelect && onSelect(e)
    e.preventDefault()
  }

  return (
    <DropdownPrimitive.Item asChild className={`${s.item} ${className}`} onSelect={onSelectHandler}>
      <motion.div {...dropdownAnimations.item}>{children}</motion.div>
    </DropdownPrimitive.Item>
  )
}

export type DropdownItemWithIconProps = {
  icon: ReactNode
  text: string
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Item> &
  Omit<DropdownItemProps, 'children'>

export const DropdownItemWithIcon = ({
  className,
  icon,
  onSelect,
  text,
  ...restProps
}: DropdownItemWithIconProps) => {
  const onSelectHandler = (e: Event) => {
    onSelect && onSelect(e)
    e.preventDefault()
  }

  return (
    <DropdownPrimitive.Item
      asChild
      className={`${s.item} ${className}`}
      {...restProps}
      onSelect={onSelectHandler}
    >
      <motion.div {...dropdownAnimations.item}>
        <div className={s.itemIcon}>{icon}</div>
        <Typography variant={TypographyVariant.Caption}>{text}</Typography>
      </motion.div>
    </DropdownPrimitive.Item>
  )
}
