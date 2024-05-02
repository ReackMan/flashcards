import { ReactElement } from 'react'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'
import { AddCardModal } from '@/features'

export const AddCard = (): ReactElement => {
  return (
    <AddCardModal
      options={[
        { title: 'Text', value: 'text' },
        { title: 'Picture', value: 'picture' },
      ]}
      placeholder={'Data format type'}
      trigger={
        <Button>
          <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
            Add New Card
          </Typography>
        </Button>
      }
    />
  )
}
