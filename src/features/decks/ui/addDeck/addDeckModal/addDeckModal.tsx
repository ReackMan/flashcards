import { ReactElement, ReactNode, useState } from 'react'

import { mutationNotificationHandler, useAppDispatch } from '@/common'
import { Modal } from '@/components'
import { DeckForm, decksActions, useCreateDeckMutation } from '@/features'

export type AddDeckModalProps = {
  buttonTitle: string
  trigger: ReactNode
  values?: {
    cover?: null | string
    isPrivate?: boolean
    name: string
  }
}

export const AddDeckModal = ({ buttonTitle, trigger, values }: AddDeckModalProps): ReactElement => {
  const [open, setOpen] = useState(false)
  const [createDeck, { error }] = useCreateDeckMutation()
  const { setCurrentPage } = decksActions

  const dispatch = useAppDispatch()

  const closeModal = () => {
    setOpen(false)
  }

  const createDeckCallback = (data: FormData) => {
    dispatch(setCurrentPage({ currentPage: 1 }))

    mutationNotificationHandler(createDeck(data), true).then(data => {
      if (data?.status === 'success') {
        closeModal()
      }
    })
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Add New Deck'} trigger={trigger}>
      <DeckForm
        buttonTitle={buttonTitle}
        error={error}
        onClose={closeModal}
        onSubmit={createDeckCallback}
        values={values}
      />
    </Modal>
  )
}
