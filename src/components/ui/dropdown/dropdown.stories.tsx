import { DeleteIcon, EditIcon, PlayCircleIcon } from '@/assets'
import { DropdownItemWithIcon } from '@/components'
import { Meta, StoryObj } from '@storybook/react'

import { Dropdown } from './dropdown'

const meta: Meta<typeof Dropdown> = {
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
  },
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownItemWithIcon
          icon={<PlayCircleIcon size={1.6} />}
          onSelect={() => {}}
          text={'Learn'}
        />
        <DropdownItemWithIcon icon={<EditIcon size={1.6} />} onSelect={() => {}} text={'Edit'} />
        <DropdownItemWithIcon
          icon={<DeleteIcon size={1.6} />}
          onSelect={() => {}}
          text={'Delete'}
        />
      </>
    ),
  },
}
