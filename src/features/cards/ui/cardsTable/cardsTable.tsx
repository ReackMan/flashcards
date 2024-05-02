import { ReactElement } from 'react'

import { TypographyVariant, formatDate } from '@/common'
import { Rating, Sort, Table, TableHeader, Typography } from '@/components'
import { Card, DeleteCard, EditCard, getCardsColumnsData } from '@/features'

import s from './cardsTable.module.scss'

type Props = {
  cards: Card[]
  isOwner: boolean
  onSort: (value: Sort) => void
  sort: Sort
}
export const CardsTable = ({ cards, isOwner, onSort, sort }: Props): ReactElement => {
  return (
    <Table.Root className={s.root}>
      <TableHeader columns={getCardsColumnsData(isOwner)} onSort={onSort} sort={sort} />
      <Table.Body>
        {cards.map(card => {
          return (
            <Table.Row key={card.id}>
              <Table.Cell className={s.cellQuestion}>
                <div className={s.imageWrapper}>
                  {card.questionImg && (
                    <img alt={'Card question'} className={s.image} src={card.questionImg} />
                  )}
                  <Typography variant={TypographyVariant.Body2}>{card.question}</Typography>
                </div>
              </Table.Cell>
              <Table.Cell className={s.cellAnswer}>
                <div className={s.imageWrapper}>
                  {card.answerImg && (
                    <img alt={'Card answer'} className={s.image} src={card.answerImg} />
                  )}
                  <Typography variant={TypographyVariant.Body2}>{card.answer}</Typography>
                </div>
              </Table.Cell>
              <Table.Cell className={s.cellUpdated}>
                <Typography variant={TypographyVariant.Body2}>
                  {formatDate(card.updated)}
                </Typography>
              </Table.Cell>
              <Table.Cell>
                <Rating rating={card.grade} />
              </Table.Cell>
              {isOwner && (
                <Table.Cell
                  className={`${s.cellIcons} ${
                    (card.answerImg || card.questionImg) && s.cellIconsCover
                  }`}
                >
                  <EditCard card={card} />
                  <DeleteCard cardId={card.id} deckId={card.deckId} />
                </Table.Cell>
              )}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
