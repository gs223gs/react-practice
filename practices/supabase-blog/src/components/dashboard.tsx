import { useState } from "react";
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
import { useTodos } from "@/hooks/useTodo";
import { useTodoMutation } from "@/hooks/useTodoMutation";
import type { Todo } from "@/types/todos.type";

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const form = useFormWithValidation();
  const { data: todos, isLoading } = useTodos();
  const { createTodo, deleteTodo, updateTodo } = useTodoMutation();
  console.log(todos);
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createTodo(data.title);
  };
  const handleUpdate = (id: string, todo: Todo) => {
    updateTodo(id, {...todo, title: editedTitle});
    setIsEdit(false);
    console.log("update", editedTitle);
  };
  console.log("dashboard render");
  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="m-10 w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
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
              <Button type="submit" className="justify-center items-center">
                追加
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {todos?.map((todo) => (
            <>
            {isEdit ? (
              <div key={todo.id}>
                <Input
                  placeholder="タスクを入力してください"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <Button onClick={() => handleUpdate(todo.id, todo)}>完了</Button>
                <Button onClick={() => setIsEdit(false)}>もどる</Button>
              </div>
            ) : (
              <div key={todo.id}>
                {todo.title}
                <Button onClick={() => setIsEdit(true)}>編集</Button>
                <Button onClick={() => deleteTodo(todo.id)}>削除</Button>
              </div>
            )}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
