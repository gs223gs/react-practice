import "./App.css";
import { useState } from "react";

import Header from "./Header";
import useCRUD from "./useCRUD";
import useSession from "./useSession";
import TodoList from "./TodoList";
const Dashbord = () => {

  const { userdata } = useSession();
  const { createTodo} = useCRUD();
  const [task, setTask] = useState<string>("");



  console.log("render")
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

      <TodoList />
    </>
  );
};

export default Dashbord;
