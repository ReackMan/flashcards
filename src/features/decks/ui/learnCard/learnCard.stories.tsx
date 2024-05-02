import type { Meta, StoryObj } from '@storybook/react'

import { LearnCard } from './'

const meta: Meta<typeof LearnCard> = {
  component: LearnCard,
  tags: ['autodocs'],
  title: 'Decks/LearnCard',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    card: {
      answer: 'This is how "This" works in JavaScript',
      answerImg: 'https://placehold.co/350x120',
      id: '1',
      question: 'How "This" works in JavaScript?',
      questionImg: 'https://placehold.co/350x120',
      shots: 10,
    },
    deck: {
      id: '1',
      name: 'JavaScript',
    },
  },
}
