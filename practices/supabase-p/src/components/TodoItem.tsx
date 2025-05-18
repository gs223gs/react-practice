import "../App.css";
import { Button } from "@/components/ui/button";
import type { Todo } from "../types/todos.type";

import useCRUD from "@/hooks/useCRUD";
import type { KeyedMutator } from "swr";

const TodoItem = ({
  todo,
  mutate,
}: {
  todo: Todo;
  mutate: KeyedMutator<Todo[]>;
}) => {
  const { updateTodo, deleteTodo } = useCRUD();
  const handleUpdate = async () => {
    await updateTodo(todo.id, { ...todo, is_done: true });
    mutate();
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    mutate();
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
      <h3 className="font-bold text-center mr-4">{todo.title}</h3>
      <div className="flex gap-2">
        <Button onClick={handleUpdate}>編集</Button>
        <Button onClick={handleUpdate}>完了</Button>
        <Button onClick={handleDelete}>削除</Button>
      </div>
    </div>
  );
};

export default TodoItem;
