import { ReactElement } from 'react'

import { TypographyVariant } from '@/common'
import { Button, Card, ControlledInput, Typography } from '@/components'

import s from './createNewPasswordForm.module.scss'

import { CreatePasswordFormValue, useCreatePasswordForm } from './useCreatePasswordForm'

type Props = {
  onSubmit: (data: CreatePasswordFormValue) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useCreatePasswordForm()

  return (
    <Card className={s.formWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h2'} className={s.formHeader} variant={TypographyVariant.H1}>
          Create new password
        </Typography>
        <ControlledInput
          className={s.input}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <Typography className={s.instructionText} variant={TypographyVariant.Body2}>
          Enter a new password to log into the application and follow further instructions
        </Typography>
        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
