import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from '@/features'

const meta: Meta<typeof ForgotPasswordForm> = {
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  title: 'Auth/ForgotPasswordForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
