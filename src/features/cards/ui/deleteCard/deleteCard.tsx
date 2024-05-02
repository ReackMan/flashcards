import { ReactElement } from 'react'

import { DeleteIcon } from '@/assets'
import { Dialog, IconButton } from '@/components'
import { useDeleteCardMutation } from '@/features'
type Props = {
  cardId: string
  deckId: string
}
export const DeleteCard = ({ cardId, deckId }: Props): ReactElement => {
  const [deleteCard] = useDeleteCardMutation()

  const deleteCardCallback = () => {
    deleteCard({ cardId, deckId })
  }

  return (
    <Dialog
      action={'removeCard'}
      buttonTitle={'Delete Card'}
      itemName={cardId}
      modalHeaderTitle={'Delete Card'}
      onClick={deleteCardCallback}
      trigger={<IconButton icon={<DeleteIcon />} size={1.6} />}
    />
  )
}
