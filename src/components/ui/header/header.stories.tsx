import { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Header',
}

export default meta
type Story = StoryObj<typeof meta>

export const SingIn: Story = {
  args: {
    isLoggedIn: false,
  },
}

export const LoggedIn: Story = {
  args: {
    avatar: 'https://placehold.co/96',
    email: 'j&johnson@gmail.com',
    isLoggedIn: true,
    name: 'Ivan',
  },
}
