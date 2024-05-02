import { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { SearchIcon } from '@/assets'
import { useDebounce } from '@/common'
import { GoBack, Input, LinearProgressBar, Page, Pagination, Table } from '@/components'
import {
  AddCard,
  CardsTable,
  useCardsOptions,
  useGetCardsQuery,
  useGetDeckQuery,
  useMeQuery,
} from '@/features'

import s from './deckPage.module.scss'

import { DeckPageHeader } from './deckPageHeader'

export const DeckPage = (): ReactElement => {
  const { id = '' } = useParams<{ id: string }>()
  const {
    currentPage,
    itemsPerPage,
    onChangePage,
    onChangePageSize,
    onChangeQuestion,
    onChangeSort,
    onSetInitialState,
    orderBy,
    paginationOptions,
    question,
    sort,
  } = useCardsOptions()
  const queryParams = {
    id,
    params: { currentPage, itemsPerPage, orderBy, question: useDebounce(question, 300) },
  }

  useEffect(() => {
    return () => onSetInitialState()
  }, [])
  const { data: user } = useMeQuery()
  const { data: deck } = useGetDeckQuery({ id })
  const { data: deckData, isFetching, isLoading } = useGetCardsQuery(queryParams)

  const isOwner = user?.id === deck?.userId
  const isEmptyCard = deck && deck.cardsCount > 0
  const loadingStatus = isLoading || isFetching

  return (
    <>
      {loadingStatus && <LinearProgressBar />}
      <Page>
        <GoBack className={s.link} title={'Back to Decks List'} />
        {deck && <DeckPageHeader deck={deck} isEmptyCard={!!isEmptyCard} isOwner={isOwner} />}
        {isEmptyCard && (
          <>
            <Input
              className={s.input}
              leftIcon={<SearchIcon size={2} />}
              onChangeValue={onChangeQuestion}
              placeholder={'Input search'}
              value={question}
            />
            <CardsTable
              cards={deckData?.items || []}
              isOwner={isOwner}
              onSort={onChangeSort}
              sort={sort}
            />
            <Pagination
              currentPage={currentPage}
              onPageChange={onChangePage}
              onValueChange={onChangePageSize}
              options={paginationOptions}
              pageSize={itemsPerPage}
              totalCount={deckData?.pagination.totalItems || 0}
              value={String(itemsPerPage)}
            />
          </>
        )}
        {isOwner && !isEmptyCard && (
          <Table.Empty>
            <AddCard />
          </Table.Empty>
        )}
        {!isOwner && !isEmptyCard && !loadingStatus && (
          <Table.Empty text={'The deck is empty, please go back to learn other decks.'} />
        )}
      </Page>
    </>
  )
}
