import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Incorrect email' }),
})

export type ForgotPasswordFormValue = z.infer<typeof forgotPasswordSchema>

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordFormValue>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema),
  })
