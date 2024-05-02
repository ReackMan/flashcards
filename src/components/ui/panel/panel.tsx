import { ReactElement } from 'react'

import { DeleteIcon, SearchIcon } from '@/assets'
import { ButtonVariant } from '@/common'
import { Button, Input, Slider, TabItem, Tabs } from '@/components'

import s from './panel.module.scss'

export type PanelProps = {
  className?: string
  inputValue: string
  isDisabled?: boolean
  maxSliderValue: number
  minSliderValue: number
  onChangeInputValue: (value: string) => void
  onChangeSliderValue: (value: number[]) => void
  onChangeTabValue: (value: string) => void
  onClearFilter: () => void
  sliderLabel: string
  sliderValue: number[]
  tabLabel: string
  tabValue: string
}

export const Panel = ({
  className,
  inputValue,
  isDisabled,
  maxSliderValue,
  minSliderValue,
  onChangeInputValue,
  onChangeSliderValue,
  onChangeTabValue,
  onClearFilter,
  sliderLabel,
  sliderValue,
  tabLabel,
  tabValue,
}: PanelProps): ReactElement => {
  return (
    <div className={`${s.root} ${className}`}>
      <Input
        className={s.input}
        disabled={isDisabled}
        leftIcon={<SearchIcon />}
        onChangeValue={onChangeInputValue}
        placeholder={'Input search'}
        value={inputValue}
      />
      <Tabs className={s.tabs} label={tabLabel} onValueChange={onChangeTabValue} value={tabValue}>
        <TabItem disabled={isDisabled} value={'my'}>
          My Decks
        </TabItem>
        <TabItem disabled={isDisabled} value={'all'}>
          All Decks
        </TabItem>
      </Tabs>
      <Slider
        disabled={isDisabled}
        label={sliderLabel}
        max={maxSliderValue}
        min={minSliderValue}
        onValueChange={onChangeSliderValue}
        value={sliderValue}
      />
      <Button
        className={s.button}
        disabled={isDisabled}
        onClick={onClearFilter}
        variant={ButtonVariant.Secondary}
      >
        <>
          <DeleteIcon size={1.6} />
          Clear Filter
        </>
      </Button>
    </div>
  )
}
