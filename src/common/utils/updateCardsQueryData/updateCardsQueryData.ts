import { RootState } from '@/app'
import { formatSortedString } from '@/common'

export const updateCardsQueryData = (state: RootState) => {
  const { currentPage, pageSize, question, sortParams } = state.cards

  const sortedString = formatSortedString(sortParams)

  return {
    currentPage,
    itemsPerPage: pageSize,
    orderBy: sortedString,
    question,
  }
}
