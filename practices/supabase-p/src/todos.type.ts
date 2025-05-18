

type Todo = {
  id: string;
  title: string;
  is_done: boolean;
  user_id: string;
};

type Todos = Todo[];

export type { Todo, Todos };