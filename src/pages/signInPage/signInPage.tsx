import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

import { Route } from '@/common'
import { Page, Preloader } from '@/components'
import { LoginParamsType, SignInForm, useLoginMutation, useMeQuery } from '@/features'

export const SignInPage = (): ReactElement => {
  const { isError, isLoading } = useMeQuery()
  const [login] = useLoginMutation()

  const isAuth = !isError

  const loginHandler = (loginData: LoginParamsType) => {
    login(loginData)
  }

  if (isLoading) {
    return <Preloader />
  }

  if (isAuth) {
    return <Navigate replace to={Route.Main} />
  }

  return (
    <Page>
      <SignInForm onSubmit={loginHandler} />
    </Page>
  )
}
