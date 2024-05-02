import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(1, { message: 'Field is required!' }),
})

export type DeckFormValues = z.infer<typeof addDeckSchema>
export const useDeckForm = (defaultValues: DeckFormValues) => {
  return useForm<DeckFormValues>({
    defaultValues,
    resolver: zodResolver(addDeckSchema),
  })
}
