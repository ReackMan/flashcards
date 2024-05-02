import { ReactElement, ReactNode, useState } from 'react'
import { useParams } from 'react-router-dom'

import { mutationNotificationHandler } from '@/common'
import { Modal, OptionType } from '@/components'
import { CardForm, useCreateCardMutation } from '@/features'

type Props = {
  options: OptionType[]
  placeholder: ReactNode
  trigger: ReactNode
}

export const AddCardModal = ({ options, placeholder, trigger }: Props): ReactElement => {
  const { id = '' } = useParams<{ id: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const [createCard, { error }] = useCreateCardMutation()

  const closeModal = () => {
    setIsOpen(false)
  }
  const onSubmit = (body: FormData) => {
    mutationNotificationHandler(createCard({ body, id }), true).then(data => {
      if (data?.status === 'success') {
        closeModal()
      }
    })
  }

  return (
    <Modal open={isOpen} setOpen={setIsOpen} title={'Add New Card'} trigger={trigger}>
      <CardForm
        buttonTitle={'Add New Card'}
        closeModal={closeModal}
        error={error}
        onSubmit={onSubmit}
        options={options}
        placeholder={placeholder}
      />
    </Modal>
  )
}
