import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { RadioGroup, RadioGroupProps } from './radioGroup'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
}

export default meta
type Story = StoryObj<typeof meta>

const initialState = [
  { disabled: false, id: 'r1', title: 'First Radio', value: 'first' },
  { disabled: false, id: 'r2', title: 'Second Radio', value: 'second' },
  { disabled: true, id: 'r3', title: 'Third Radio', value: 'third' },
  { disabled: false, id: 'r4', title: 'Fourth Radio', value: 'fourth' },
]

const RadioGroupWithHooks = (args: RadioGroupProps) => {
  const [activeRadio, setActiveRadio] = useState(args.value)

  const changeActiveRadioItem = (radioValue: string) => {
    setActiveRadio(radioValue)
  }

  return (
    <RadioGroup onValueChange={changeActiveRadioItem} options={args.options} value={activeRadio} />
  )
}

export const Default: Story = {
  args: {
    options: initialState,
    value: initialState[0].value,
  },
}

export const Controlled: Story = {
  args: {
    options: initialState,
    value: initialState[0].value,
  },
  render: args => <RadioGroupWithHooks {...args} />,
}
