import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { action } from '@storybook/addon-actions'

import { Panel, PanelProps } from './panel'

const meta: Meta<typeof Panel> = {
  component: Panel,
  tags: ['autodocs'],
  title: 'Components/Panel',
}

export default meta
type Story = StoryObj<typeof meta>

const PanelWithHook = (args: PanelProps) => {
  const [inputValue, setValue] = useState(args.inputValue)
  const [tabValue, setTabValue] = useState(args.tabValue)
  const [sliderValue, setSliderValue] = useState(args.sliderValue)

  const onClearFilter = () => {
    setValue('')
    setTabValue(args.tabValue)
    setSliderValue(args.sliderValue)
  }
  const queryString = `https://www.example/${tabValue}?minCardsCount=${
    sliderValue[0]
  }&maxCardsCount=${sliderValue[1]}${inputValue && `&cardTitle=${inputValue}`}`

  action(`Url: ${queryString}`)()

  return (
    <Panel
      inputValue={inputValue}
      maxSliderValue={args.maxSliderValue}
      minSliderValue={args.minSliderValue}
      onChangeInputValue={setValue}
      onChangeSliderValue={setSliderValue}
      onChangeTabValue={setTabValue}
      onClearFilter={onClearFilter}
      sliderLabel={args.sliderLabel}
      sliderValue={sliderValue}
      tabLabel={args.tabLabel}
      tabValue={tabValue}
    />
  )
}

export const Default: Story = {
  args: {
    inputValue: '',
    maxSliderValue: 20,
    minSliderValue: 1,
    sliderLabel: 'Number of cards',
    sliderValue: [5, 15],
    tabLabel: 'Show packs cards',
    tabValue: 'allCards',
  },
}

export const ControlledPanel: Story = {
  args: {
    inputValue: '',
    maxSliderValue: 20,
    minSliderValue: 1,
    sliderLabel: 'Number of cards',
    sliderValue: [1, 20],
    tabLabel: 'Show packs cards',
    tabValue: 'allCards',
  },
  render: args => <PanelWithHook {...args} />,
}
