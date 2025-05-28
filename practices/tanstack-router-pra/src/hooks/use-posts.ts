import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { PostFormData } from '@/lib/schemas'

export function usePosts() {
  const queryClient = useQueryClient()

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: api.posts.getAll,
  })

  const createPost = useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostFormData }) =>
      api.posts.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', id] })
    },
  })

  const deletePost = useMutation({
    mutationFn: api.posts.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
  }
}

export function usePost(id: number) {
  const queryClient = useQueryClient()

  const post = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.posts.getById(id),
  })

  const comments = useQuery({
    queryKey: ['comments', id],
    queryFn: () => api.comments.getByPostId(id),
  })

  const updatePost = useMutation({
    mutationFn: (data: PostFormData) => api.posts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const deletePost = useMutation({
    mutationFn: () => api.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    post,
    comments,
    updatePost,
    deletePost,
  }
} 