import type { Meta, StoryObj } from '@storybook/react'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'
import { EditDeckModal, EditDeckModalProps } from '@/features'

const meta: Meta<typeof EditDeckModal> = {
  component: EditDeckModal,
  tags: ['autodocs'],
  title: 'Decks/EditDeckModal',
}

export default meta
type Story = StoryObj<typeof meta>

const DeckWithHooks = (args: EditDeckModalProps) => {
  return <EditDeckModal {...args} values={args.values} />
}

export const ControlledEditDeck: Story = {
  args: {
    buttonTitle: 'Edit Deck',
    trigger: (
      <Button>
        <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
          Edit Deck
        </Typography>
      </Button>
    ),
    values: {
      cover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfO_eNEJGw_BJiSB99LmDGCOny9NeGaDDAg&usqp=CAU',
      isPrivate: true,
      name: 'Example input text',
    },
  },
  render: args => <DeckWithHooks {...args} />,
}
