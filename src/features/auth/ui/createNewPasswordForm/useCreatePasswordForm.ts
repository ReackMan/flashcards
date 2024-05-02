import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createPasswordSchema = z.object({
  password: z.string().min(3, 'Use 3 characters or more for your password'),
})

export type CreatePasswordFormValue = z.infer<typeof createPasswordSchema>

export const useCreatePasswordForm = () =>
  useForm<CreatePasswordFormValue>({
    defaultValues: { password: '' },
    resolver: zodResolver(createPasswordSchema),
  })
