import '../App.css'
import { Button } from "@/components/ui/button";
import type { Todo } from "../types/todos.type";

import useCRUD from '@/hooks/useCRUD';
import type { KeyedMutator } from 'swr';

const TodoItem = ({ todo, mutate }: { todo: Todo, mutate: KeyedMutator<Todo[]> }) => {
  const {updateTodo, deleteTodo} = useCRUD()
  const handleUpdate = async () => {
    await updateTodo(todo.id, !todo.is_done);
    mutate();
  }
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    mutate();
  }
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold">{todo.title}</h3>
      <p>{todo.is_done ? "完了" : "未完了"}</p>
      <Button onClick={handleUpdate}>完了</Button>
      <Button onClick={handleDelete}>削除</Button>
    </div>
  );
};

export default TodoItem;
