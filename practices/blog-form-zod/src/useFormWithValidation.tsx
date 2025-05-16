import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "./validation";

const useFormWithValidation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    //ここのmodeでいつバリデーションを行うかを指定しますよ
    //onChangeでは入力した度にバリデーションを行うようになりますよ
    //入力のたびに赤文字でると興奮しちゃうので今回はonSubmitで行きましょい
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      pokeId: "",
    },
  });

  return form;
}

export default useFormWithValidation;
