import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Route, TypographyVariant, formatDate } from '@/common'
import { Sort, Table, TableHeader, Typography } from '@/components'
import { DecksResponseType } from '@/features'

import s from './decksTable.module.scss'

import { columnsData } from './columnsData'
import { DecksTableIcons } from './decksTableIcons'

type Props = {
  decksData: DecksResponseType
  isDisabled: boolean
  onSort: (sort: Sort) => void
  sort: Sort | undefined
}

export const DecksTable = ({ decksData, isDisabled, onSort, sort }: Props): ReactElement => {
  return (
    <>
      {!!decksData?.items.length && (
        <Table.Root className={s.root}>
          <TableHeader columns={columnsData} onSort={onSort} sort={sort} />
          <Table.Body>
            {decksData?.items.map(item => {
              return (
                <Table.Row key={`${item.userId}-${item.updated}`}>
                  <Table.Cell className={s.cellName}>
                    <Link to={`${Route.Decks}/${item.id}/cards`}>
                      <div className={s.cellImage}>
                        {item.cover && (
                          <img alt={'deck-cover'} className={s.image} src={item.cover} />
                        )}
                        <Typography variant={TypographyVariant.Body2}>{item.name}</Typography>
                      </div>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className={s.cellCardsCount}>
                    <Typography variant={TypographyVariant.Body2}>{item.cardsCount}</Typography>
                  </Table.Cell>
                  <Table.Cell className={s.cellUpdated}>
                    <Typography variant={TypographyVariant.Body2}>
                      {formatDate(item.updated)}
                    </Typography>
                  </Table.Cell>
                  <Table.Cell className={s.cellAuthor}>
                    <Typography variant={TypographyVariant.Body2}>{item.author.name}</Typography>
                  </Table.Cell>
                  <Table.Cell className={`${s.cellIcon} ${item.cover && s.cellIconCover}`}>
                    <DecksTableIcons deck={item} isDisabled={isDisabled} />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      )}
      {!decksData?.items.length && (
        <Table.Empty text={'Your Decks list is empty. Click Add New Deck to fill this deck.'} />
      )}
    </>
  )
}
