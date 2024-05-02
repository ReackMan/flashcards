import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowDownIcon, ArrowUpIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Typography } from '@/components'

import s from './tableHeader.module.scss'

import { Table } from '../table'

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

type TableHeaderProps = Omit<
  {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  } & ComponentPropsWithoutRef<typeof Table.Head>,
  'children'
>

export const TableHeader = forwardRef<ElementRef<typeof Table.Head>, TableHeaderProps>(
  ({ columns, onSort, sort, ...restProps }, ref) => {
    const handleSort = (key: string, sortable?: boolean) => () => {
      if (!onSort || !sortable) {
        return
      }

      if (sort?.key !== key) {
        return onSort({ direction: 'asc', key })
      }

      if (sort.direction === 'desc') {
        return onSort(null)
      }

      return onSort({
        direction: sort?.direction === 'asc' ? 'desc' : 'asc',
        key,
      })
    }

    return (
      <Table.Head ref={ref} {...restProps}>
        <Table.Row>
          {columns.map(({ key, sortable, title }) => {
            return (
              <Table.HeadCell
                className={`${sortable && s.activeHeadCell}`}
                key={key}
                onClick={handleSort(key, sortable)}
              >
                <Typography
                  as={'span'}
                  className={s.sortCell}
                  variant={TypographyVariant.Subtitle2}
                >
                  {title}
                  {sort && sort.key === key && (
                    <>
                      {sort.direction === 'asc' && (
                        <ArrowUpIcon className={s.sortIcon} size={1.2} />
                      )}
                      {sort.direction !== 'asc' && (
                        <ArrowDownIcon className={s.sortIcon} size={1.2} />
                      )}
                    </>
                  )}
                </Typography>
              </Table.HeadCell>
            )
          })}
        </Table.Row>
      </Table.Head>
    )
  }
)
