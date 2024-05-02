import { EditIcon } from '@/assets'
import { IconButton, OptionType } from '@/components'
import { EditCardModal } from '@/features'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof EditCardModal> = {
  component: EditCardModal,
  tags: ['autodocs'],
  title: 'Cards/EditCardModal',
}

export default meta
type Story = StoryObj<typeof meta>

const options: OptionType[] = [
  { title: 'Text', value: 'text' },
  { title: 'Picture', value: 'picture' },
]

const card = {
  answer: 'It is programming language',
  answerImg: null,
  answerVideo: 'no-video',
  created: new Date().toDateString(),
  deckId: 'sdf3asd32',
  grade: 3,
  id: '1234sdafcsf',
  question: 'What is JS',
  questionImg: null,
  questionVideo: 'no-video',
  shots: 0,
  updated: new Date().toDateString(),
  userId: 'user1',
}

export const DefaultEditCardModal: Story = {
  args: {
    card,
    options,
    trigger: <IconButton icon={<EditIcon />} size={1.6} />,
  },
}
