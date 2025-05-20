import { useSWRConfig } from "swr";
import supabase from "@/lib/supabase/client";
import type{ Todo } from "@/types/todos.type";

export function useTodoMutation() {
  const { mutate } = useSWRConfig();

  const createTodo = async (title: string) => {
    const { error } = await supabase.from("todos").insert([{ title }]);

    if (error) throw error;
    mutate("todos");
  };

  const updateTodo = async (id: string, todo: Todo) => {
    const { error } = await supabase
      .from("todos")
      .update({...todo})
      .eq("id", id);

    if (error) throw error;
    mutate("todos");
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) throw error;
    mutate("todos");
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
