import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

import { Button, ControlledRadioGroup } from '@/components'

import s from './rateLearnCard.module.scss'

import { rateOptions } from './rateOptions'

export type RateLearnCardValues = {
  grade: string
}

type Props = {
  onSubmit: (data: RateLearnCardValues) => void
}

export const RateLearnCard = ({ onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useForm<RateLearnCardValues>({
    defaultValues: { grade: '1' },
  })

  return (
    <form className={s.root} onSubmit={handleSubmit(onSubmit)}>
      <ControlledRadioGroup
        className={s.radioGroup}
        control={control}
        name={'grade'}
        options={rateOptions}
      />
      <Button fullWidth type={'submit'}>
        Next Question
      </Button>
    </form>
  )
}
