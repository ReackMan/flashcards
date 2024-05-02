import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Card, IconButton, Typography } from '@/components'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

import s from './modal.module.scss'

import { modalAnimations } from './modalWindowAnimations'

export type ModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<'div'>, ModalProps>(
  ({ children, className, open, setOpen, title, trigger, ...restProps }, ref) => {
    // debugger

    return (
      <ModalPrimitive.Root onOpenChange={setOpen} open={open}>
        <ModalPrimitive.Trigger asChild>{trigger}</ModalPrimitive.Trigger>
        <AnimatePresence>
          {open && (
            <ModalPrimitive.Portal forceMount>
              <motion.div {...modalAnimations.overlay}>
                <ModalPrimitive.Overlay className={s.overlay} forceMount />
              </motion.div>
              <div className={`${s.root} ${className}`} ref={ref} {...restProps}>
                <ModalPrimitive.Content asChild forceMount>
                  <motion.div {...modalAnimations.window}>
                    <Card>
                      <header className={s.header}>
                        <Typography as={'h2'} variant={TypographyVariant.H2}>
                          {title}
                        </Typography>
                        <ModalPrimitive.Close asChild>
                          <IconButton aria-label={'Close'} icon={<CloseIcon />} />
                        </ModalPrimitive.Close>
                      </header>
                      <div>{children}</div>
                    </Card>
                  </motion.div>
                </ModalPrimitive.Content>
              </div>
            </ModalPrimitive.Portal>
          )}
        </AnimatePresence>
      </ModalPrimitive.Root>
    )
  }
)
