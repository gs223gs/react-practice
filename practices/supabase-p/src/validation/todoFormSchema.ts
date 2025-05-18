import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, "文字数足りませー! 1文字以上にして下さい!")
    .max(20, "長すぎるわ！ 20文字以内にしろ!"),
});
