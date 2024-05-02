import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { ButtonVariant, Route, TypographyVariant } from '@/common'
import { Button, Card, ControlledCheckbox, ControlledInput, Typography } from '@/components'
import { DevTool } from '@hookform/devtools'

import s from './signInForm.module.scss'

import { SignInFormValues, useSignInForm } from './useSignInForm'

type Props = {
  onSubmit: (data: SignInFormValues) => void
}

export const SignInForm = ({ onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useSignInForm()

  return (
    <Card className={s.formWrapper}>
      <Typography as={'h1'} className={s.formHeader} variant={TypographyVariant.H1}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledInput control={control} label={'Email'} name={'email'} placeholder={'Email'} />
        <ControlledInput
          className={s.inputPasswordWrapper}
          control={control}
          label={'Password'}
          name={'password'}
          placeholder={'Password'}
          type={'password'}
        />
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
          position={'left'}
        />
        <Typography
          as={Link}
          className={s.forgotPasswordLink}
          to={Route.ForgotPassword}
          variant={TypographyVariant.Body2}
        >
          Forgot Password?
        </Typography>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography className={s.infoText} variant={TypographyVariant.Body2}>
        {`Don't have an account?`}
      </Typography>
      <Button as={Link} className={s.signUpLink} to={Route.SignUp} variant={ButtonVariant.Link}>
        Sign Up
      </Button>
    </Card>
  )
}
