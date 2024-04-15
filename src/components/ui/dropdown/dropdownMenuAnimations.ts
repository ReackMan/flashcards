import { MotionProps } from 'framer-motion'

const menu = {
  exit: 'closed',
  initial: 'closed',
  variants: {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        duration: 0.15,
        staggerChildren: 0.1,
      },
    },
  },
} satisfies MotionProps

const item = {
  transition: { opacity: { duration: 0.15 } },
  variants: {
    closed: { opacity: 0, x: -14 },
    open: { opacity: 1, x: 0 },
  },
} satisfies MotionProps

export const dropdownAnimations = { item, menu }
