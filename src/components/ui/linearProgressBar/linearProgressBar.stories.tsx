import { LinearProgressBar } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LinearProgressBar> = {
  component: LinearProgressBar,
  tags: ['autodocs'],
  title: 'Components/LinearProgressBar',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
