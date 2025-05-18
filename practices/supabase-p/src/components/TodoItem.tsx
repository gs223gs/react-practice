import "../App.css";
import { Button } from "@/components/ui/button";
import type { Todo } from "../types/todos.type";

import useCRUD from "@/hooks/useCRUD";
import type { KeyedMutator } from "swr";
import { useState } from "react";
import TodoEditing from "./TodoEditing";

const TodoItem = ({
  todo,
  mutate,
}: {
  todo: Todo;
  mutate: KeyedMutator<Todo[]>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { updateTodo, deleteTodo } = useCRUD();

  const handleUpdate = async () => {
    await updateTodo(todo.id, { ...todo, title: editedTitle });
    mutate();
    setIsEditing(false);
  };
  const handleDone = async () => {
    await updateTodo(todo.id, { ...todo, is_done: true });
    mutate();
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    mutate();
  };
  return (
    <div>
      {isEditing ? (
        <TodoEditing
          handleUpdate={handleUpdate}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
        />
      ) : (
        <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <h3 className="font-bold text-center mr-4">{todo.title}</h3>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(!isEditing)}>編集</Button>
            <Button onClick={handleDone}>完了</Button>
            <Button onClick={handleDelete}>削除</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
