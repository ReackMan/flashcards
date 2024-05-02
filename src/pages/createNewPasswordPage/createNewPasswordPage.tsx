import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Route, mutationNotificationHandler } from '@/common'
import { Page } from '@/components'
import { CreateNewPasswordForm, useResetPasswordMutation } from '@/features'

export const CreateNewPasswordPage = (): ReactElement => {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>()
  const [resetPassword] = useResetPasswordMutation()

  const onSubmit = (data: { password: string }) => {
    if (token) {
      mutationNotificationHandler(
        resetPassword({ ...data, token }),
        false,
        'Your password has been successfully changed. Try to login.'
      ).then(data => {
        if (data?.status === 'success') {
          navigate(Route.SignIn)
        }
      })
    }
  }

  return (
    <Page>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </Page>
  )
}
