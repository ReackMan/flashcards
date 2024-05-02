import { baseApi, getTextFromFormData, queryNotificationHandler } from '@/common'
import {
  BaseResponseType,
  LoginParamsType,
  LoginResponseType,
  RecoverPasswordParamsType,
  ResetPasswordParamsType,
  SignUpParamsType,
} from '@/features'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponseType, LoginParamsType>({
      invalidatesTags: ['Me'],
      query: body => ({
        body,
        method: 'POST',
        url: 'auth/login',
      }),
      transformErrorResponse: response => queryNotificationHandler(response),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['Me'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(authApi.util.updateQueryData('me', undefined, () => null))

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      transformErrorResponse: response => queryNotificationHandler(response),
    }),
    me: builder.query<BaseResponseType | null, void>({
      providesTags: ['Me'],
      query: () => 'auth/me',
    }),
    recoverPassword: builder.mutation<void, RecoverPasswordParamsType>({
      query: params => ({
        body: {
          email: params.email,
          html: '<h1>Hi, ##name##</h1><p>Click <a href="https://flashcards-learning.vercel.app/create-new-password/##token##">here</a> to recover your password</p>',
          subject: 'Recovery Password',
        },
        method: 'POST',
        url: 'auth/recover-password',
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordParamsType>({
      query: ({ password, token }) => ({
        body: { password },
        method: 'POST',
        url: `auth/reset-password/${token}`,
      }),
    }),
    signUp: builder.mutation<BaseResponseType, SignUpParamsType>({
      invalidatesTags: ['Me'],
      query: params => ({
        body: params,
        method: 'POST',
        url: 'auth/sign-up',
      }),
      transformErrorResponse: response => queryNotificationHandler(response),
    }),
    updateProfile: builder.mutation<BaseResponseType, FormData>({
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        let avatar = ''

        const patchResult = dispatch(
          authApi.util.updateQueryData('me', undefined, draft => {
            const name = getTextFromFormData(body.get('name'))
            const avatarBlob = body.get('avatar')

            if (avatarBlob instanceof Blob) {
              avatar = URL.createObjectURL(avatarBlob)
            }

            if (draft && avatar) {
              draft.avatar = avatar
            }

            if (draft && name) {
              draft.name = name
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        } finally {
          URL.revokeObjectURL(avatar)
        }
      },
      query: body => ({
        body,
        method: 'PATCH',
        url: 'auth/me',
      }),
      transformErrorResponse: response => queryNotificationHandler(response),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authApi
