import type { Meta, StoryObj } from '@storybook/react'

import { TypographyVariant } from '@/common'
import { Button, Typography } from '@/components'
import { AddDeckModal, AddDeckModalProps } from '@/features'

const meta: Meta<typeof AddDeckModal> = {
  component: AddDeckModal,
  tags: ['autodocs'],
  title: 'Decks/AddDeckModal',
}

export default meta
type Story = StoryObj<typeof meta>

const DeckWithHooks = (args: AddDeckModalProps) => {
  return <AddDeckModal {...args} values={args.values} />
}

export const ControlledAddDeck: Story = {
  args: {
    buttonTitle: 'Add Deck',
    trigger: (
      <Button>
        <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
          Add new Deck
        </Typography>
      </Button>
    ),
  },
  render: args => <DeckWithHooks {...args} />,
}
