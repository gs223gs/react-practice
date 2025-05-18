import '../App.css'
import useSession from "../hooks/useSession";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

const TodosList = () => {
  const { userdata } = useSession();
  const { todos, isLoading, isError, mutate} = useTodos(userdata?.id ?? "");
  if(!userdata?.id){
    return <div>ログインしてください</div>
  }
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error: {isError.message}</div>

  mutate()
  console.log("TodoList render")
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {todos?.length == 0 && <div className="p-4 bg-red-100 rounded-lg shadow-md ">Todoがありません</div>}
      {todos &&
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} mutate={mutate} />
        ))}
    </div>
  );
};

export default TodosList;
