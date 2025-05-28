import { z } from 'zod'

export const postSchema = z.object({
  userId: z.number().min(1),
  title: z.string().min(1).max(20),
  body: z.string().min(1).max(50),
})

export const post = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
})

export const comment = z.object({
  id: z.number(),
  postId: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
})

export type PostFormData = z.infer<typeof postSchema> 
export type Post = z.infer<typeof post>
export type Comment = z.infer<typeof comment>