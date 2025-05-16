import {z} from "zod"

export const validation = z.object({
  name: z.string().nonempty("名前は必須").min(4,"4文字以上"),
  email: z.string().nonempty("メールは必須").email("正しいメールアドレスを入力"),
  password: z.string().nonempty("パスは必須").min(4,"4文字以上")
})