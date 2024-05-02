import { Control } from 'react-hook-form'

import { ImageIcon } from '@/assets'
import { ButtonVariant, TypographyVariant } from '@/common'
import { Button, ControlledInput, Typography, Uploader } from '@/components'

import s from './cardFormField.module.scss'

import { CardFormValuesType } from '../useAddForm'

type Props = {
  control: Control<CardFormValuesType>
  dataFieldFormat: string
  imageUrl: null | string | undefined
  label: string
  name: 'answer' | 'question'
  onLoadCover: (data: File) => void
  onLoadError: (error: string) => void
}

export const CardFormField = ({
  control,
  dataFieldFormat,
  imageUrl,
  label,
  name,
  onLoadCover,
  onLoadError,
}: Props) => {
  const buttonUploadText = imageUrl ? 'Change Cover' : ' Add Cover'

  return (
    <>
      {dataFieldFormat === 'text' && (
        <ControlledInput className={s.fieldItem} control={control} label={label} name={name} />
      )}
      {dataFieldFormat === 'picture' && (
        <>
          {imageUrl && (
            <div className={s.imageBlock}>
              <img alt={'Card cover'} src={imageUrl} />
            </div>
          )}
          <Uploader onLoadCover={onLoadCover} onLoadError={onLoadError}>
            <Button
              className={s.fieldItem}
              fullWidth
              type={'button'}
              variant={ButtonVariant.Secondary}
            >
              <ImageIcon />
              <Typography as={'span'} variant={TypographyVariant.Subtitle2}>
                {buttonUploadText}
              </Typography>
            </Button>
          </Uploader>
        </>
      )}
    </>
  )
}
