import type { Meta, StoryObj } from '@storybook/react'

import { OptionType, Select } from './select'

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
}

export default meta
type Story = StoryObj<typeof meta>

const initialState: OptionType[] = [
  { title: 'First Select', value: 'first' },
  { title: 'Second Select', value: 'second' },
  { title: 'Third Select', value: 'third' },
  { title: 'Fourth Select', value: 'fourth' },
]

export const Default: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    options: initialState,
  },
}

export const FullWidth: Story = {
  args: {
    disabled: false,
    fullWidth: true,
    options: initialState,
  },
}

export const WithLabel: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    label: 'Select label',
    options: initialState,
  },
}

const initialStatePagination: OptionType[] = [
  { title: '10', value: 'ten' },
  { title: '20', value: 'twenty' },
  { title: '30', value: 'thirty' },
  { title: '50', value: 'forty' },
  { title: '100', value: 'one hundred' },
]

export const Pagination: Story = {
  args: {
    disabled: false,
    options: initialStatePagination,
    placeholder: initialStatePagination[4].title,
    variant: 'pagination',
  },
}
