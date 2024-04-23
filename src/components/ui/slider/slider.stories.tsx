import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider, SliderProps } from './'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const SliderWithHooks = (args: SliderProps) => {
  const [value, setValue] = useState(args.value)

  const handleOnValueChange = (value: number[]) => {
    setValue(value)
  }

  return <Slider {...args} onValueChange={handleOnValueChange} value={value} />
}

export const Default: Story = {
  args: {
    label: 'Default',
    max: 10,
    min: 0,
    step: 1,
    value: [0, 10],
  },
  render: args => <SliderWithHooks {...args} />,
}
