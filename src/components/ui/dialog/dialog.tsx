import { ReactElement, ReactNode, useState } from 'react'

import { ButtonVariant, TypographyVariant } from '@/common'
import { Button, Modal, Typography } from '@/components'

import s from './dialog.module.scss'
type ActionDialog = 'removeCard' | 'removeDeck'

type DialogProps = {
  action: ActionDialog
  buttonTitle: string
  itemName: string
  modalHeaderTitle: string
  onClick: () => void
  trigger: ReactNode
}

export const Dialog = ({
  action,
  buttonTitle,
  itemName,
  modalHeaderTitle,
  onClick,
  trigger,
}: DialogProps): ReactElement => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const onButtonClickHandler = () => {
    onClick()
    setOpen(false)
  }

  return (
    <Modal open={open} setOpen={setOpen} title={modalHeaderTitle} trigger={trigger}>
      <div className={s.root}>
        <Typography className={s.text} variant={TypographyVariant.Body1}>
          {getDialogText(action, itemName)}
        </Typography>
        <div className={s.buttonContainer}>
          <Button onClick={onClose} type={'button'} variant={ButtonVariant.Secondary}>
            <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
              Cancel
            </Typography>
          </Button>
          <Button onClick={onButtonClickHandler}>
            <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
              {buttonTitle}
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const getDialogText = (action: ActionDialog, itemName?: string) => {
  const dialogVariants: {
    [key in ActionDialog]: ReactNode
  } = {
    removeCard: (
      <>
        Do you really want to remove this card from deck. <br></br>Card will be deleted.
      </>
    ),
    removeDeck: (
      <>
        Do you really want to remove <b>{itemName}?</b> <br></br> All cards will be deleted.
      </>
    ),
  }

  return dialogVariants[action]
}
