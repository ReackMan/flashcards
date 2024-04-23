import { CSSProperties, useEffect, useState } from 'react'

import { ButtonVariant, TypographyVariant } from '@/common'
import { Button, Modal, ModalProps, Typography } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
}

export default meta
type Story = StoryObj<typeof meta>

const ModalWithText = (args: ModalProps) => {
  const [isOpen, setIsOpen] = useState(args.open)

  useEffect(() => {
    setIsOpen(args.open)
  }, [args.open])

  const textWrapper: CSSProperties = {
    padding: '18px 24px',
  }

  const actionBlock: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 24px 36px',
  }

  return (
    <Modal open={isOpen} setOpen={setIsOpen} title={args.title} trigger={<Button>Open</Button>}>
      <div style={textWrapper}>
        <Typography variant={TypographyVariant.Body1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniamdsa
        </Typography>
      </div>
      <div style={actionBlock}>
        <Button onClick={() => setIsOpen(false)} variant={ButtonVariant.Secondary}>
          Close
        </Button>
        <Button onClick={() => setIsOpen(false)}>Action</Button>
      </div>
    </Modal>
  )
}

export const ControlledWithText: Story = {
  args: {
    open: false,
    setOpen: () => {},
    title: 'Modal title',
  },
  render: (args: ModalProps) => <ModalWithText {...args} />,
}
