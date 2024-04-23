import { LeftArrowIcon, RightArrowIcon } from '@/assets'
import { TypographyVariant } from '@/common'
import { Select, SelectProps, Typography } from '@/components'
import { usePagination } from '@/components/ui/pagination/usePagination'

import s from './pagination.module.scss'

export type PaginationProps = {
  currentPage: number
  onPageChange: (pageNumber: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
} & SelectProps

export const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  siblingCount = 1,
  totalCount,
  ...restProps
}: PaginationProps) => {
  const totalPageCount = Math.ceil(totalCount / pageSize)
  const paginationItems = usePagination({ currentPage, siblingCount, totalPageCount })

  const setPrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }
  const setNextPage = () => {
    if (currentPage !== totalPageCount) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className={s.root}>
      <div className={s.paginationContainer}>
        <button
          className={`${s.controller} ${currentPage === 1 && s.disabledController}`}
          onClick={setPrevPage}
          tabIndex={0}
        >
          <LeftArrowIcon />
        </button>
        {paginationItems.map((num, index) => {
          if (num === '...') {
            return (
              <button className={s.dots} key={index} tabIndex={-1}>
                {num}
              </button>
            )
          } else {
            return (
              <button
                className={`${s.item} ${num === currentPage && s.activeItem}`}
                key={index}
                onClick={() => onPageChange(num)}
                tabIndex={0}
              >
                <Typography as={'span'} variant={TypographyVariant.Body2}>
                  {num}
                </Typography>
              </button>
            )
          }
        })}
        <button
          className={`${s.controller} ${currentPage === totalPageCount && s.disabledController}`}
          onClick={setNextPage}
          tabIndex={0}
        >
          <RightArrowIcon />
        </button>
      </div>
      <div className={s.selectContainer}>
        <Typography as={'span'} variant={TypographyVariant.Body2}>
          Показать
        </Typography>
        <Select className={s.select} {...restProps} variant={'pagination'} />
        <Typography as={'span'} variant={TypographyVariant.Body2}>
          на странице
        </Typography>
      </div>
    </div>
  )
}
