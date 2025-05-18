import "./App.css";
import { useEffect, useState } from "react";

import Header from "./Header";
import useCRUD from "./useCRUD";
import useSession from "./useSession";
import type { Todos } from "./todos.type";

const Dashbord = () => {
  const [todos, setTodos] = useState<Todos | null>(null);
  const { userdata } = useSession();
  const { createTodo, fetchTodos } = useCRUD();
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    if (userdata?.id) {
      fetchTodos(userdata.id).then((todos) => setTodos(todos));
      console.log("fetch");
    }
  }, [userdata?.id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTask("");

    if (userdata?.id) {
      createTodo(task, userdata.id);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <span>タスク入力</span>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          追加
        </button>
      </form>
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
    </>
  );
};

export default Dashbord;
