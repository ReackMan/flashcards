import { ReactElement, useState } from 'react'

import { ImageIcon } from '@/assets'
import { ButtonVariant, TypographyVariant, formatMutationError } from '@/common'
import { Button, ControlledCheckbox, ControlledInput, Typography, Uploader } from '@/components'
import { DeckFormValues, useDeckForm } from '@/features'
import { DevTool } from '@hookform/devtools'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './deckForm.module.scss'

export type DeckFormProps = {
  buttonTitle: string
  error?: FetchBaseQueryError | SerializedError | undefined
  onClose: () => void
  onSubmit: (data: FormData) => void
  values?: {
    cover?: null | string
    isPrivate?: boolean
    name: string
  }
}

export const DeckForm = ({
  buttonTitle,
  error,
  onClose,
  onSubmit,
  values,
}: DeckFormProps): ReactElement => {
  const [cover, setCover] = useState<File | null>(null)
  const [coverError, setCoverError] = useState<null | string>(null)

  // --- for toast component error
  console.log(coverError)

  const { control, handleSubmit, setError } = useDeckForm({
    isPrivate: values?.isPrivate || false,
    name: values?.name || '',
  })

  const formatError = formatMutationError(error)

  if (formatError) {
    formatError.forEach(error => {
      const errorField = error.field as keyof DeckFormValues

      setError(errorField, {
        message: error.message || undefined,
        type: 'custom',
      })
    })
  }

  const imageUrl = cover ? URL.createObjectURL(cover) : values?.cover
  const buttonUploadText = imageUrl ? 'Change Cover' : ' Add Cover'

  const onSubmitHandler = (data: DeckFormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', `${data.isPrivate}`)
    cover && formData.append('cover', cover)

    onSubmit(formData)
  }

  const onLoadCover = (data: File) => {
    setCover(data)
    setCoverError(null)
  }

  const onLoadCoverError = (error: string) => {
    setCoverError(error)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
      {imageUrl && (
        <div className={s.imageBlock}>
          <img alt={'Pack cover'} src={imageUrl} />
        </div>
      )}
      <Uploader className={s.uploader} onLoadCover={onLoadCover} onLoadError={onLoadCoverError}>
        <Button fullWidth type={'button'} variant={ButtonVariant.Secondary}>
          <ImageIcon />
          <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
            {buttonUploadText}
          </Typography>
        </Button>
      </Uploader>
      <ControlledInput className={s.input} control={control} label={'Name Pack'} name={'name'} />
      <ControlledCheckbox
        className={s.checkbox}
        control={control}
        label={'Private pack'}
        name={'isPrivate'}
        position={'left'}
      />
      <div className={s.buttonsContainer}>
        <Button onClick={onClose} type={'button'} variant={ButtonVariant.Secondary}>
          <Typography variant={TypographyVariant.Subtitle2}>Cancel</Typography>
        </Button>
        <Button>
          <Typography variant={TypographyVariant.Subtitle2}>{buttonTitle}</Typography>
        </Button>
      </div>
      <DevTool control={control} />
    </form>
  )
}
