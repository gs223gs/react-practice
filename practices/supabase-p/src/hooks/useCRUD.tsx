
import supabase from "../supabase";
import type { Todos,Todo } from "../types/todos.type";

const useCRUD = () => {

  const createTodo = async (title: string, userId: string) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, user_id: userId }]);
    if (error) console.error("Error creating todo:", error);
    return data;
  };

  const fetchTodos = async (userId: string):Promise<Todo[]> => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .eq("is_done", false)
      .order("created_at", { ascending: false })
    if (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
    const todos = data.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        is_done: todo.is_done,
      };
    });
    return todos as Todos;
  };

  const updateTodo = async (id: string, todo: Todo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ ...todo })
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
