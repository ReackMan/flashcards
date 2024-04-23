import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

import s from './table.module.scss'

const Root = ({ className, ...restProps }: ComponentPropsWithoutRef<'table'>) => {
  return <table className={`${s.root} ${className}`} {...restProps} />
}

const Head = ({ className, ...restProps }: ComponentPropsWithoutRef<'thead'>) => {
  return <thead className={`${s.thead} ${className}`} {...restProps} />
}

const Body = ({ className, ...restProps }: ComponentPropsWithoutRef<'tbody'>) => {
  return <tbody className={`${s.body} ${className}`} {...restProps} />
}

const Row = ({ className, ...restProps }: ComponentPropsWithoutRef<'tr'>) => {
  return <tr className={`${s.row} ${className}`} {...restProps} />
}

const HeadCell = ({ className, ...restProps }: ComponentPropsWithoutRef<'th'>) => {
  return <th className={`${s.headCell} ${className}`} {...restProps} />
}

const Cell = ({ className, ...restProps }: ComponentPropsWithoutRef<'td'>) => {
  return <td className={`${s.cell} ${className}`} {...restProps} />
}

type EmptyProps = {
  children?: ReactNode
  className?: string
  text?: string
} & ComponentPropsWithoutRef<'div'>

const Empty = ({
  children,
  className,
  text = 'This deck is empty. Click add new deck to fill this deck',
  ...restProps
}: EmptyProps) => {
  return (
    <div className={`${s.empty} ${className}`} {...restProps}>
      <Typography className={s.emptyDescription} variant={TypographyVariant.Body1}>
        {text}
      </Typography>
      {children}
    </div>
  )
}

export const Table = { Body, Cell, Empty, Head, HeadCell, Root, Row }
