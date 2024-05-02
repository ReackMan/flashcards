import { Button, OptionType } from '@/components'
import { AddCardModal } from '@/features'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AddCardModal> = {
  component: AddCardModal,
  tags: ['autodocs'],
  title: 'Cards/AddCardModal',
}

export default meta
type Story = StoryObj<typeof meta>

const options: OptionType[] = [
  { title: 'Text', value: 'text' },
  { title: 'Picture', value: 'picture' },
]

export const Default: Story = {
  args: {
    options,
    trigger: <Button>Add New Card</Button>,
  },
}
