import type { Meta, StoryObj } from '@storybook/react'

import { GoBack } from './goBack'

const meta: Meta<typeof GoBack> = {
  component: GoBack,
  tags: ['autodocs'],
  title: 'Components/GoBack',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Back',
  },
}
