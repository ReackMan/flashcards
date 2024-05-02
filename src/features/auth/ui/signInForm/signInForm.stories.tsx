import { SignInForm } from '@/features'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
  tags: ['autodocs'],
  title: 'Auth/SignInForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
