import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteIcon, EditIcon, PlayCircleIcon } from '@/assets'
import { Route } from '@/common'
import { Dialog, DropdownItemWithIcon, IconButton } from '@/components'
import { EditDeckModal, GetDeckResponseType, useDeleteDeckMutation } from '@/features'

type Props = {
  deck: GetDeckResponseType
  isOwner: boolean
  variant: 'dropDown' | 'tableCell'
}

export const DeckManageTools = ({ deck, isOwner, variant }: Props): ReactElement => {
  const { cover, id, isPrivate, name } = deck
  const [deleteDeck] = useDeleteDeckMutation()
  const navigate = useNavigate()

  const toLearnDeck = () => {
    navigate(`${Route.Decks}/${deck.id}/learn`)
  }

  const deleteDeckCallback = () => {
    deleteDeck({ id })
  }

  const learnIcon =
    variant === 'dropDown' ? (
      <DropdownItemWithIcon
        icon={<PlayCircleIcon size={1.6} />}
        onSelect={toLearnDeck}
        text={'Learn'}
      />
    ) : (
      <IconButton icon={<PlayCircleIcon />} size={1.6} />
    )

  const editIcon =
    variant === 'dropDown' ? (
      <DropdownItemWithIcon icon={<EditIcon size={1.6} />} text={'Edit'} />
    ) : (
      <IconButton icon={<EditIcon />} size={1.6} />
    )

  const deleteIcon =
    variant === 'dropDown' ? (
      <DropdownItemWithIcon icon={<DeleteIcon size={1.6} />} text={'Delete'} />
    ) : (
      <IconButton icon={<DeleteIcon />} size={1.6} />
    )

  return (
    <>
      {learnIcon}
      {isOwner && variant === 'dropDown' && (
        <>
          <EditDeckModal
            buttonTitle={'Save Changes'}
            id={id}
            trigger={editIcon}
            values={{ cover, isPrivate, name }}
          />
          <Dialog
            action={'removeDeck'}
            buttonTitle={'Delete Deck'}
            itemName={name}
            modalHeaderTitle={'Delete Deck'}
            onClick={deleteDeckCallback}
            trigger={deleteIcon}
          />
        </>
      )}
    </>
  )
}
