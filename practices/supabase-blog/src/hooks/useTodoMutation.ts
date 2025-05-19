import { useSWRConfig } from "swr";
import supabase from "@/lib/supabase/client";

export function useTodoMutation() {
  const { mutate } = useSWRConfig();

  const createTodo = async (title: string) => {
    const { error } = await supabase.from("todos").insert([{ title }]);

    if (error) throw error;
    mutate("todos");
  };

  const updateTodo = async (id: string, isDone: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_done: isDone })
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
