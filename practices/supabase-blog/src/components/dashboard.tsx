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
import useFormWithValidation from "@/hooks/useFormWithValidation";
import { z } from "zod";
import { formSchema } from "@/lib/validation/todoform";
/*TODO
swr

*/
const Dashboard = () => {
  const form = useFormWithValidation();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
      console.log("Form submitted with data:",data.title);
  }
  return (
    <div className="flex flex-col justify-center items-center m-10">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="m-10 w-1/2">
        <Form {...form} >
            <form onSubmit={form.handleSubmit(data => handleSubmit(data))}>
              <FormField
                control={form.control}
                name="title" // ここでnameを指定 zodで定義したやつ
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
            <Button type="submit" className="justify-center items-center" >追加</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
