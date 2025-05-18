import { useState, useEffect } from "react";
import useCRUD from "./useCRUD";
import type { Todos } from "./todos.type";
import useSession from "./useSession";

const TodosList = () => {
  const { userdata } = useSession();
  const [todos, setTodos] = useState<Todos | null>(null);
  const { fetchTodos } = useCRUD();
  useEffect(() => {
    if (userdata?.id) {
      fetchTodos(userdata.id).then((todos) => setTodos(todos));
      console.log("fetch");
    }
  }, [userdata?.id]);
  return (
    <div>
      <div>todos</div>
      {/* {todos == null && <div>Todoがありません</div>} */}
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            {todo.title} {todo.is_done}
          </div>
        ))}
    </div>
  );
};

export default TodosList;
