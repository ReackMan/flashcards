import { ChangeEvent, ComponentPropsWithoutRef, ReactElement, ReactNode, useRef } from 'react'

import { TypographyVariant } from '@/common'
import { Typography } from '@/components'
import { ZodError } from 'zod'

import s from './uploader.module.scss'

import { UploaderPayload, uploaderSchema } from './uploaderSchema'

type Props = {
  children: ReactNode
  onLoadCover: (file: UploaderPayload) => void
  onLoadError: (error: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Uploader = ({
  children,
  className,
  onLoadCover,
  onLoadError,
  ...restProps
}: Props): ReactElement => {
  const ref = useRef<HTMLInputElement>(null)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    try {
      uploaderSchema.parse(file)
      if (file) {
        onLoadCover(file)
      }
    } catch (e) {
      const err = e as Error | ZodError

      if (err instanceof ZodError) {
        onLoadError('Zod error: ' + err.errors[0].message)
      } else {
        onLoadError('Native error: ' + err.message)
      }
    }
  }

  return (
    <Typography
      as={'label'}
      className={`${s.uploader} ${className}`}
      onClick={() => ref.current?.click()}
      variant={TypographyVariant.Subtitle2}
    >
      {children}
      <input
        className={s.fileInput}
        onChange={onChangeHandler}
        ref={ref}
        type={'file'}
        {...restProps}
      />
    </Typography>
  )
}
