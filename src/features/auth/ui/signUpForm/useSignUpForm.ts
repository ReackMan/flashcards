import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3, 'Use 3 characters or more for your password').trim(),
    email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
    password: z.string().min(3, 'Use 3 characters or more for your password').trim(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Those passwords didn’t match. Try again.',
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>

export const useSignUpForm = () =>
  useForm<SignUpFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })
