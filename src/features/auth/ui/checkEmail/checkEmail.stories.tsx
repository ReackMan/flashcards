import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from '@/features'

const meta: Meta<typeof CheckEmail> = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Auth/CheckEmail',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'testEmail@gmail.com',
  },
}
