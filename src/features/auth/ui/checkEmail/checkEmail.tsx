import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { Email } from '@/assets'
import { Route, TypographyVariant } from '@/common'
import { Button, Card, Typography } from '@/components'

import s from './checkEmail.module.scss'

type CheckEmailProps = {
  email: string
}

export const CheckEmail = ({ email = 'example@mail.com' }: CheckEmailProps): ReactElement => {
  return (
    <Card className={s.formWrapper}>
      <Typography as={'h2'} className={s.formHeader} variant={TypographyVariant.H1}>
        Check Email
      </Typography>
      <Email className={s.emailImage} />
      <Typography className={s.instructionText} variant={TypographyVariant.Body2}>
        {`We’ve sent an Email with instructions to ${email}`}
      </Typography>
      <Button as={Link} className={s.signInLink} fullWidth to={Route.SignIn}>
        Back to Sign In
      </Button>
    </Card>
  )
}
