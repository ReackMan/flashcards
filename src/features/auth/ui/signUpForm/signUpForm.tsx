import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { ButtonVariant, Route, TypographyVariant } from '@/common'
import { Button, Card, ControlledInput, Typography } from '@/components'
import { SignUpDataType } from '@/features'
import { DevTool } from '@hookform/devtools'

import s from './signUpForm.module.scss'

import { useSignUpForm } from './useSignUpForm'

type Props = {
  onSubmit: (data: SignUpDataType) => void
}

export const SignUpForm = ({ onSubmit }: Props): ReactElement => {
  const { control, handleSubmit } = useSignUpForm()

  return (
    <Card className={s.formWrapper}>
      <Typography as={'h1'} className={s.formHeader} variant={TypographyVariant.H1}>
        Sign Up
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
        <ControlledInput
          className={s.inputConfirmPasswordWrapper}
          control={control}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder={'Confirm Password'}
          type={'password'}
        />
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography className={s.infoText} variant={TypographyVariant.Body2}>
        Already have an account?
      </Typography>
      <Button as={Link} className={s.signInLink} to={Route.SignIn} variant={ButtonVariant.Link}>
        Sign In
      </Button>
    </Card>
  )
}
