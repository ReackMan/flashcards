import { ReactElement, ReactNode, useState } from 'react'

import { ButtonVariant, TypographyVariant, formatMutationError } from '@/common'
import { Button, ControlledSelect, OptionType, Typography } from '@/components'
import { CardFormField } from '@/features'
import { DevTool } from '@hookform/devtools'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './cardForm.module.scss'

import { CardFormValuesType, useCardForm } from './useAddForm'
export type CardValues = {
  answer: string
  answerImg: null | string
  question: string
  questionImg: null | string
}

type Props = {
  buttonTitle: string
  cardValues?: CardValues
  closeModal: () => void
  error?: FetchBaseQueryError | SerializedError | undefined
  onSubmit: (data: FormData) => void
  options: OptionType[]
  placeholder: ReactNode
}

export const CardForm = ({
  buttonTitle,
  cardValues,
  closeModal,
  error,
  onSubmit,
  options,
  placeholder,
}: Props): ReactElement => {
  const [questionCover, setQuestionCover] = useState<File | null>(null)
  const [answerCover, setAnswerCover] = useState<File | null>(null)
  // use toast component for error
  const [questionCoverError, setQuestionCoverError] = useState<null | string>(null)
  const [answerCoverError, setAnswerCoverError] = useState<null | string>(null)

  console.log(questionCoverError, answerCoverError)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    watch,
  } = useCardForm({ answer: cardValues?.answer || '', question: cardValues?.question || '' })

  const questionFormat = watch('questionFormat')
  const questionError = errors.question?.message
  const answerFormat = watch('answerFormat')
  const answerError = errors.answer?.message

  if (questionError && questionFormat === 'picture') {
    setValue('questionFormat', 'text')
  }
  if (answerError && answerFormat === 'picture') {
    setValue('answerFormat', 'text')
  }
  const formatError = formatMutationError(error)

  if (formatError) {
    formatError.forEach(error => {
      const errorField = error.field as keyof CardFormValuesType

      !errors[errorField] &&
        setError(errorField, {
          message: error.message || undefined,
          type: 'custom',
        })
    })
  }
  const questionImageUrl = questionCover
    ? URL.createObjectURL(questionCover)
    : cardValues?.questionImg
  const answerImageUrl = answerCover ? URL.createObjectURL(answerCover) : cardValues?.questionImg

  const onSubmitHandler = (data: CardFormValuesType) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    questionCover && formData.append('questionImg', questionCover)
    answerCover && formData.append('answerImg', answerCover)
    onSubmit(formData)
  }
  const onLoadQuestionCover = (data: File) => {
    setQuestionCover(data)
    setQuestionCoverError(null)
  }
  const onLoadQuestionCoverError = (error: string) => {
    setQuestionCoverError(error)
  }

  const onLoadAnswerCover = (data: File) => {
    setAnswerCover(data)
    setAnswerCoverError(null)
  }
  const onLoadAnswerCoverError = (error: string) => {
    setAnswerCoverError(error)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <DevTool control={control} />
      <ControlledSelect
        className={s.selectItem}
        control={control}
        fullWidth
        label={'Choose a question format (text format is required!)'}
        name={'questionFormat'}
        options={options}
        placeholder={placeholder}
      />
      <CardFormField
        control={control}
        dataFieldFormat={questionFormat}
        imageUrl={questionImageUrl}
        label={'Question'}
        name={'question'}
        onLoadCover={onLoadQuestionCover}
        onLoadError={onLoadQuestionCoverError}
      />
      <ControlledSelect
        className={s.selectItem}
        control={control}
        fullWidth
        label={'Choose an answer format (text format is required!)'}
        name={'answerFormat'}
        options={options}
        placeholder={placeholder}
      />
      <CardFormField
        control={control}
        dataFieldFormat={answerFormat}
        imageUrl={answerImageUrl}
        label={'Answer'}
        name={'answer'}
        onLoadCover={onLoadAnswerCover}
        onLoadError={onLoadAnswerCoverError}
      />
      <div className={s.actionBlock}>
        <Button onClick={closeModal} type={'reset'} variant={ButtonVariant.Secondary}>
          <Typography variant={TypographyVariant.Subtitle2}>Cancel</Typography>
        </Button>
        <Button type={'submit'}>
          <Typography variant={TypographyVariant.Subtitle2}>{buttonTitle}</Typography>
        </Button>
      </div>
    </form>
  )
}
