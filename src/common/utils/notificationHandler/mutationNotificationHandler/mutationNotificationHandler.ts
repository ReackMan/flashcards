import { toast } from 'react-toastify'

export type FieldErrorMessage = {
  field: string
  message: string
}

export type ErrorData = {
  errorMessages: FieldErrorMessage[]
  message: string
}

type CommonErrorType = {
  error: string
}

export type ResponseErrorType = {
  data: ErrorData | undefined
  status: number
}

export const mutationNotificationHandler = async (
  request: Promise<any>,
  isForm: boolean = false,
  successMessage?: string
) => {
  try {
    const result = await request

    if ('data' in result) {
      if (successMessage) {
        toast.success(successMessage)
      }

      return { data: result.data, error: null, status: 'success' }
    } else if ('data' in result.error) {
      const error = result.error as ResponseErrorType

      const errorMessage =
        error?.data?.errorMessages?.[0]?.message ||
        error?.data?.errorMessages?.[0] ||
        'Some error occurred'

      if (!isForm) {
        toast.error(errorMessage as string)

        return {
          data: null,
          error: error?.data?.message,
          status: 'error',
        }
      }

      if ('message' in result.error.data) {
        toast.error(error?.data?.message)

        return {
          data: null,
          error: error?.data?.message,
          status: 'error',
        }
      }

      return { data: null, error: errorMessage, status: 'error' }
    } else if ('error' in result) {
      const error = result.error as CommonErrorType

      if (!isForm) {
        toast.error(error.error)
      }

      return { data: null, error: error.error, status: 'error' }
    }
  } catch (error) {
    toast.error('Some error occurred')
  }
}
