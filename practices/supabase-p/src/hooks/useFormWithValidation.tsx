import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "../validation/todoFormSchema";

const useFormWithValidation = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return form;
}

export default useFormWithValidation;