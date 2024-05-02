import { ReactElement, useState } from 'react'

import { mutationNotificationHandler } from '@/common'
import { Modal } from '@/components'
import { AddDeckModalProps, DeckForm, useUpdateDeckMutation } from '@/features'

export type EditDeckModalProps = {
  id: string
} & AddDeckModalProps

export const EditDeckModal = ({
  buttonTitle,
  id,
  trigger,
  values,
}: EditDeckModalProps): ReactElement => {
  const [open, setOpen] = useState(false)
  const [updateDeck, { error }] = useUpdateDeckMutation()

  const closeModal = () => {
    setOpen(false)
  }

  const editDeckCallback = (data: FormData) => {
    mutationNotificationHandler(updateDeck({ body: data, id }), true).then(data => {
      if (data?.status === 'success') {
        closeModal()
      }
    })
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Edit Deck'} trigger={trigger}>
      <DeckForm
        buttonTitle={buttonTitle}
        error={error}
        onClose={closeModal}
        onSubmit={editDeckCallback}
        values={values}
      />
    </Modal>
  )
}
