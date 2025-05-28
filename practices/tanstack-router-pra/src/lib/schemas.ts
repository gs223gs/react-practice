import { z } from 'zod'

export const postSchema = z.object({
  userId: z.number().min(1),
  title: z.string().min(1).max(20),
  body: z.string().min(1).max(50),
})

export type PostFormData = z.infer<typeof postSchema> 