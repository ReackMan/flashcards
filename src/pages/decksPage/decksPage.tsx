import { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { formatSortedString, useDebounce } from '@/common'
import { LinearProgressBar, Page, Pagination, Panel } from '@/components'
import { DecksTable, useDecksOptions, useGetDecksQuery } from '@/features'

import s from './decksPage.module.scss'

import { DecksPageHeader } from './decksPageHeader'

export const DecksPage = (): ReactElement => {
  const {
    authorId,
    cardsCount,
    currentPage,
    onChangeCurrentPageCallback,
    onChangePageSizeCallback,
    onChangeSliderValueCallback,
    onChangeSortCallback,
    onChangeTabValueCallback,
    onClearFilterCallback,
    onSearchCallback,
    pageOptions,
    pageSize,
    searchName,
    setCardsCount,
    sliderRangeValue,
    sortOptions,
    tabValue,
  } = useDecksOptions()

  const dispatch = useDispatch()

  const debouncedSearchName = useDebounce(searchName)
  const debouncedSliderRangeValue = useDebounce(sliderRangeValue)

  const sortedString = formatSortedString(sortOptions)

  let { currentData, data, isFetching, isLoading } = useGetDecksQuery({
    authorId,
    currentPage,
    itemsPerPage: pageSize,
    maxCardsCount: debouncedSliderRangeValue.max,
    minCardsCount: debouncedSliderRangeValue.min,
    name: debouncedSearchName,
    orderBy: sortedString,
  })

  if (!currentData && data) {
    currentData = { ...data }
  }

  useEffect(() => {
    if (
      debouncedSliderRangeValue.max === undefined ||
      debouncedSliderRangeValue.max === null ||
      debouncedSliderRangeValue.max !== currentData?.maxCardsCount ||
      !currentData?.maxCardsCount
    ) {
      onChangeSliderValueCallback([0, currentData?.maxCardsCount ?? 0])
      dispatch(setCardsCount({ cardsCount: { max: currentData?.maxCardsCount ?? 0, min: 0 } }))
    }
  }, [currentData?.maxCardsCount])

  const loadingStatus = isLoading || isFetching

  return (
    <>
      {loadingStatus && <LinearProgressBar />}
      <Page className={s.root}>
        <DecksPageHeader isDisabled={loadingStatus} />
        <Panel
          className={s.panelWrapper}
          inputValue={searchName}
          isDisabled={loadingStatus}
          maxSliderValue={Number(data?.maxCardsCount)}
          minSliderValue={cardsCount.min}
          onChangeInputValue={onSearchCallback}
          onChangeSliderValue={onChangeSliderValueCallback}
          onChangeTabValue={onChangeTabValueCallback}
          onClearFilter={onClearFilterCallback}
          sliderLabel={'Number of cards'}
          sliderValue={[
            sliderRangeValue?.min ?? 0,
            sliderRangeValue?.max ?? currentData?.maxCardsCount ?? 0,
          ]}
          tabLabel={'Show decks cards'}
          tabValue={tabValue}
        />
        {currentData && currentData.items.length > 0 && (
          <>
            <DecksTable
              decksData={currentData}
              isDisabled={loadingStatus}
              onSort={onChangeSortCallback}
              sort={sortOptions}
            />
            <Pagination
              currentPage={currentPage}
              onPageChange={onChangeCurrentPageCallback}
              onValueChange={onChangePageSizeCallback}
              options={pageOptions}
              pageSize={pageSize}
              totalCount={currentData?.pagination.totalItems || 10}
              value={String(pageSize)}
            />
          </>
        )}
      </Page>
    </>
  )
}
