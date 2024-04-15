import { ComponentPropsWithoutRef, ReactNode, useState } from 'react'

import { MoreIcon } from '@/assets'
import { IconButton } from '@/components'
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion } from 'framer-motion'

import s from './dropdown.module.scss'

import { dropdownAnimations } from './dropdownMenuAnimations'

export type DropdownProps = {
  align?: 'center' | 'end' | 'start'
  children: ReactNode
  className?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownPrimitive.Content>

export const Dropdown = ({ align = 'end', children, className, trigger }: DropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownPrimitive.Root onOpenChange={setOpen} open={open}>
      <DropdownPrimitive.Trigger asChild className={s.trigger}>
        {trigger ?? <IconButton icon={<MoreIcon />} />}
      </DropdownPrimitive.Trigger>
      <AnimatePresence>
        {open && (
          <DropdownPrimitive.Portal forceMount>
            <DropdownPrimitive.Content
              align={align}
              asChild
              className={`${s.content} ${className}`}
              forceMount
              onClick={event => event.stopPropagation()}
            >
              <motion.div animate={open ? 'open' : 'closed'} {...dropdownAnimations.menu}>
                <div>{children}</div>
                <DropdownPrimitive.Arrow className={s.arrow} />
              </motion.div>
            </DropdownPrimitive.Content>
          </DropdownPrimitive.Portal>
        )}
      </AnimatePresence>
    </DropdownPrimitive.Root>
  )
}
