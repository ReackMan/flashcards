import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { ButtonVariant, Route, TypographyVariant } from '@/common'
import { Button, Card, ControlledInput, Typography } from '@/components'

import s from './forgotPasswordForm.module.scss'

import { ForgotPasswordFormValue, useForgotPasswordForm } from './useForgotPasswordForm'

type Props = {
  onSubmit: (data: ForgotPasswordFormValue) => void
}

export const ForgotPasswordForm = ({ onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useForgotPasswordForm()

  return (
    <Card className={s.formWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h2'} className={s.formHeader} variant={TypographyVariant.H1}>
          Forgot your password?
        </Typography>
        <ControlledInput
          className={s.input}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Email'}
        />
        <Typography className={s.instructionText} variant={TypographyVariant.Body2}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
        <Typography className={s.questionText} variant={TypographyVariant.Body2}>
          Did you remember your password?
        </Typography>
        <Button as={Link} className={s.signInLink} to={Route.SignIn} variant={ButtonVariant.Link}>
          Try logging in
        </Button>
      </form>
    </Card>
  )
}
