import { RootState } from '@/app'
import { formatSortedString } from '@/common'

export const updateDecksQueryData = (state: RootState) => {
  const { authorId, cardsCount, currentPage, pageSize, searchName, sortOptions } = state.decks

  const sortedString = formatSortedString(sortOptions)

  return {
    authorId,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: cardsCount.max,
    minCardsCount: cardsCount.min,
    name: searchName,
    orderBy: sortedString,
  }
}
