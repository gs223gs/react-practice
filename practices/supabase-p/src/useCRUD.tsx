
import supabase from "./supabase";
import type { Todos } from "./todos.type";

const useCRUD = () => {

  const createTodo = async (title: string, userId: string) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, user_id: userId }]);
    if (error) console.error("Error creating todo:", error);
    return data;
  };

  const fetchTodos = async (userId: string) => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
    return data as Todos;
  };

  const updateTodo = async (id: string, isDone: boolean) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ is_done: isDone })
      .eq("id", id);
    if (error) console.error("Error updating todo:", error);
    return data;
  };

  const deleteTodo = async (id: string) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error("Error deleting todo:", error);
    return data;
  };
  return { createTodo, fetchTodos, updateTodo, deleteTodo };
};
export default useCRUD;
