// useTodos.ts
import useSWR, { type KeyedMutator } from 'swr'
import useCRUD from './useCRUD'
import type { Todo } from './todos.type'



export function useTodos(userId: string): {
  todos?: Todo[]
  isLoading: boolean
  isError: Error | null
  mutate: KeyedMutator<Todo[]>
} {
  const { fetchTodos } = useCRUD();
  // SWR のキーは配列にしておくと、後から invalidate しやすい
  const { data, error, mutate } = useSWR(
    userId ? ['todos', userId] : null,
    () => fetchTodos(userId)
  )

  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
