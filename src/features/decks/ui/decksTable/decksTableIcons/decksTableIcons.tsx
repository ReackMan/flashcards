import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteIcon, EditIcon, PlayCircleIcon } from '@/assets'
import { mutationNotificationHandler } from '@/common'
import { Dialog, IconButton } from '@/components'
import { DeckType, EditDeckModal, useDeleteDeckMutation, useMeQuery } from '@/features'

type Props = {
  deck: DeckType
  isDisabled: boolean
}

export const DecksTableIcons = ({ deck, isDisabled }: Props): ReactElement => {
  const { author, cover, id, isPrivate, name } = deck

  const { data: user } = useMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()

  const navigate = useNavigate()

  const deleteDeckCallback = () => {
    mutationNotificationHandler(deleteDeck({ id }), false, `Deck is successfully deleted`)
  }

  const learnCallback = () => {
    navigate(`${id}/learn`)
  }

  return (
    <>
      <IconButton
        disabled={isDisabled}
        icon={<PlayCircleIcon />}
        onClick={learnCallback}
        size={1.6}
      />
      {user?.id === author.id && (
        <>
          <EditDeckModal
            buttonTitle={'Save Changes'}
            id={id}
            trigger={<IconButton disabled={isDisabled} icon={<EditIcon />} size={1.6} />}
            values={{ cover, isPrivate, name }}
          />
          <Dialog
            action={'removeDeck'}
            buttonTitle={'Delete Deck'}
            itemName={name}
            modalHeaderTitle={'Delete Deck'}
            onClick={deleteDeckCallback}
            trigger={<IconButton disabled={isDisabled} icon={<DeleteIcon />} size={1.6} />}
          />
        </>
      )}
    </>
  )
}
