import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/types/todos.type";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = memo(({ todo, onUpdate, onDelete }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo.id, { ...todo, title: editedTitle });
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <div className="flex gap-2 items-center p-2">
        <Input
          placeholder="タスクを入力してください"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <Button onClick={handleUpdate}>完了</Button>
        <Button onClick={() => setIsEdit(false)}>もどる</Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center p-2">
      <span className="flex-1">{todo.title}</span>
      <Button onClick={() => setIsEdit(true)}>編集</Button>
      <Button onClick={() => onDelete(todo.id)}>削除</Button>
    </div>
  );
});

TodoItem.displayName = "TodoItem";
