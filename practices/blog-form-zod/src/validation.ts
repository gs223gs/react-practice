import { z } from "zod";

export const formSchema = z.object({
  pokeId: z.string().regex(/^(?:[1-9][0-9]{0,2}|10[0-1][0-9]|102[0-5])$/, { message: "1から1025までの数字を入力してください" }),
});
