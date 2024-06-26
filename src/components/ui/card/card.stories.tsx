import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div style={{ fontSize: '24px', textAlign: 'center' }}>Card</div>,
    style: {
      height: '300px',
      padding: '24px',
      width: '300px',
    },
  },
}
