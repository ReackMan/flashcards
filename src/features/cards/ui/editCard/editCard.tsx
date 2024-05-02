import { ReactElement } from 'react'

import { EditIcon } from '@/assets'
import { IconButton } from '@/components'
import { Card, EditCardModal } from '@/features'

type Props = {
  card: Card
}

export const EditCard = ({ card }: Props): ReactElement => {
  return (
    <EditCardModal
      card={card}
      options={[
        { title: 'Text', value: 'text' },
        { title: 'Picture', value: 'picture' },
      ]}
      placeholder={'Data format type'}
      trigger={<IconButton icon={<EditIcon />} size={1.6} />}
    />
  )
}
