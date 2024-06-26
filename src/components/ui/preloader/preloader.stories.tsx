import type { Meta, StoryObj } from '@storybook/react'

import { Preloader } from '@/components'

const meta: Meta<typeof Preloader> = {
  component: Preloader,
  tags: ['autodocs'],
  title: 'Components/Preloader',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
