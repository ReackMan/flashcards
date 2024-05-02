import { ReactElement } from 'react'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'
import { AddDeckModal } from '@/features'

import s from './decksPageHeader.module.scss'

type Props = {
  isDisabled?: boolean
}

export const DecksPageHeader = ({ isDisabled }: Props): ReactElement => {
  return (
    <div className={s.root}>
      <Typography as={'h1'} className={s.formHeader} variant={TypographyVariant.H1}>
        Decks list
      </Typography>
      <AddDeckModal
        buttonTitle={'Add New Deck'}
        trigger={
          <Button disabled={isDisabled}>
            <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
              Add New Deck
            </Typography>
          </Button>
        }
      />
    </div>
  )
}
