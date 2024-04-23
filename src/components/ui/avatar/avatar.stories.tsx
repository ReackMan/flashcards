import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  argTypes: {
    userName: String,
  },
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    userName: 'John Doe',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    userName: 'John Doe',
  },
}

export const DefaultWithImage: Story = {
  args: {
    image: 'https://placehold.co/36',
    userName: 'John Doe',
  },
}

export const LargeWithImage: Story = {
  args: {
    image: 'https://placehold.co/96',
    size: 'large',
    userName: 'John Doe',
  },
}
