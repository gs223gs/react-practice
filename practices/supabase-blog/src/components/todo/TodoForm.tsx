import { memo } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "@/lib/validation/todoform";
import useFormWithValidation from "@/hooks/useFormWithValidation";

interface TodoFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export const TodoForm = memo(({ onSubmit }: TodoFormProps) => {
  const form = useFormWithValidation();

  return (
    <div className="m-10 w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タスク入力</FormLabel>
                <FormControl>
                  <Input
                    placeholder="タスクを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormDescription>タスクを入力してください</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="justify-center items-center">
            追加
          </Button>
        </form>
      </Form>
    </div>
  );
});

TodoForm.displayName = "TodoForm"; 