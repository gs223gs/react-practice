const BASE_URL = 'https://jsonplaceholder.typicode.com'

export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export type Comment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export const api = {
  posts: {
    getAll: async (): Promise<Post[]> => {
      const response = await fetch(`${BASE_URL}/posts`)
      return response.json()
    },
    getById: async (id: number): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts/${id}`)
      return response.json()
    },
    create: async (post: Omit<Post, 'id'>): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
      })
      return response.json()
    },
    update: async (id: number, post: Post): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
      })
      return response.json()
    },
    delete: async (id: number): Promise<void> => {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      })
    },
  },
  comments: {
    getByPostId: async (postId: number): Promise<Comment[]> => {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
      return response.json()
    },
  },
} 