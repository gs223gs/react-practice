
import useSession from "./useSession";
import { useTodos } from "./useTodos";

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
    <div>
      {todos?.length == 0 && <div>Todoがありません</div>}
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
