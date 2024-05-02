import { DeleteIcon } from '@/assets'
import { ButtonVariant } from '@/common'
import { Button } from '@/components'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './dialog'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'Components/Dialog',
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultDeletePack: Story = {
  args: {
    action: 'removeDeck',
    buttonTitle: 'Delete Pack',
    itemName: 'First Pack',
    modalHeaderTitle: 'Delete Pack',
    onClick: action('Clicked for Delete Pack button'),
    trigger: (
      <Button variant={ButtonVariant.Secondary}>
        <DeleteIcon size={1.6} /> Delete Pack
      </Button>
    ),
  },
}

export const DefaultDeleteCard: Story = {
  args: {
    action: 'removeCard',
    buttonTitle: 'Delete Card',
    itemName: 'First Card',
    modalHeaderTitle: 'Delete Card',
    onClick: action('Clicked for Delete Card button'),
    trigger: (
      <Button variant={ButtonVariant.Secondary}>
        <DeleteIcon size={1.6} /> Delete Card
      </Button>
    ),
  },
}
