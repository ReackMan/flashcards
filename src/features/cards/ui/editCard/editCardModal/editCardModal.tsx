import { ReactElement, ReactNode, useState } from 'react'

import { mutationNotificationHandler } from '@/common'
import { Modal, OptionType } from '@/components'
import { Card, CardForm, useUpdateCardMutation } from '@/features'

type Props = {
  card: Card
  options: OptionType[]
  placeholder: ReactNode
  trigger: ReactNode
}

export const EditCardModal = ({ card, options, placeholder, trigger }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)

  const [updateCard, { error }] = useUpdateCardMutation()
  const { answer, answerImg, deckId, id, question, questionImg } = card
  const cardValues = { answer, answerImg, question, questionImg }

  const closeModal = () => {
    setIsOpen(false)
  }
  const onSubmit = (body: FormData) => {
    mutationNotificationHandler(updateCard({ body, cardId: id, deckId }), true).then(data => {
      if (data?.status === 'success') {
        closeModal()
      }
    })
  }

  return (
    <Modal open={isOpen} setOpen={setIsOpen} title={'Edit Card'} trigger={trigger}>
      <CardForm
        buttonTitle={'Save Changes'}
        cardValues={cardValues}
        closeModal={closeModal}
        error={error}
        onSubmit={onSubmit}
        options={options}
        placeholder={placeholder}
      />
    </Modal>
  )
}
