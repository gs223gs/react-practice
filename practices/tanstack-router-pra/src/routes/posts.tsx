import { createFileRoute } from '@tanstack/react-router'
import { Posts } from '@/components/Posts'
import { usePosts } from '@/hooks/use-posts'

export const postsRoute = createFileRoute('/posts')({
  component: PostsPage,
})

function PostsPage() {
  const { posts } = usePosts()

  if (posts.isLoading) {
    return <div>Loading...</div>
  }

  if (posts.isError) {
    return <div>Error: {posts.error.message}</div>
  }

  return <Posts posts={posts.data} />
} 