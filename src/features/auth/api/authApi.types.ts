export type BaseResponseType = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type SignUpParamsType = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type LoginResponseType = {
  accessToken: string
}

export type SignUpDataType = Pick<SignUpParamsType, 'email' | 'password'>

export type LoginParamsType = {
  rememberMe?: boolean
} & SignUpDataType

export type RecoverPasswordParamsType = Pick<SignUpParamsType, 'email'>

export type ResetPasswordParamsType = { token: string } & Pick<SignUpParamsType, 'password'>
