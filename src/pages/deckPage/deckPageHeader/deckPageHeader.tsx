import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Route, TypographyVariant } from '@/common'
import { Button, Dropdown, Typography } from '@/components'
import { AddCard, GetDeckResponseType } from '@/features'
import { DeckManageTools } from '@/pages'

import s from './deckPageHeader.module.scss'

type Props = {
  deck: GetDeckResponseType
  isEmptyCard: boolean
  isOwner: boolean
}
export const DeckPageHeader = ({ deck, isEmptyCard, isOwner }: Props): ReactElement => {
  return (
    <div className={s.root}>
      <div className={s.deckOwnerWrapper}>
        <Typography as={'h1'} variant={TypographyVariant.H1}>
          {isOwner ? 'My Deck' : 'Friends Deck'}
        </Typography>
        {isOwner && !!deck.cardsCount && (
          <Dropdown>
            <DeckManageTools deck={deck} isOwner={isOwner} variant={'dropDown'} />
          </Dropdown>
        )}
      </div>
      {isOwner && !!deck.cardsCount && <AddCard />}
      {!isOwner && isEmptyCard && (
        <Button as={Link} to={`${Route.Decks}/${deck.id}/learn`}>
          <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
            Learn Deck
          </Typography>
        </Button>
      )}
    </div>
  )
}
