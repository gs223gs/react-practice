import "../App.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Header from "./Header";
import useCRUD from "../hooks/useCRUD";
import useSession from "../hooks/useSession";
import TodoList from "../components/TodoList";
import { Input } from "@/components/ui/input";
import useFormWithValidation from "../hooks/useFormWithValidation";
import { formSchema } from "../validation/todoFormSchema";
import { useTodos } from "../hooks/useTodos";
import { z } from "zod";
const Dashbord = () => {
  const form = useFormWithValidation();
  const { userdata } = useSession();
  const { createTodo } = useCRUD();
  const { mutate } = useTodos(userdata?.id ?? "");

  console.log("render");
  const handleSubmit = (task: z.infer<typeof formSchema>) => {
    if (userdata?.id) {
      createTodo(task.title, userdata.id);
      mutate();
      form.reset();
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col items-center justify-center max-w-md mx-auto gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タスク入力</FormLabel>
                  <FormControl>
                    <Input placeholder="タスクを入力してください" {...field} />
                  </FormControl>
                  <FormDescription>タスクを入力してください</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">追加</Button>
          </form>
        </Form>
      </div>
      <TodoList />
    </>
  );
};

export default Dashbord;
