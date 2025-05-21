import { memo } from "react";
import { z } from "zod";
import { formSchema } from "@/lib/validation/todoform";
import { useTodos } from "@/hooks/useTodo";
import { useTodoMutation } from "@/hooks/useTodoMutation";
import { TodoForm } from "./todo/TodoForm";
import { TodoItem } from "./todo/TodoItem";
import type { Todo } from "@/types/todos.type";

const Dashboard = memo(() => {
  const { data: todos, isLoading } = useTodos();
  const { createTodo, deleteTodo, updateTodo } = useTodoMutation();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createTodo(data.title);
  };

  const handleUpdate = (id: string, todo: Todo) => {
    updateTodo(id, todo);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl m-10">Dashboard</h1>
      <TodoForm onSubmit={handleSubmit} />
      <div className="w-1/2">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-2">
            {todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdate}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
