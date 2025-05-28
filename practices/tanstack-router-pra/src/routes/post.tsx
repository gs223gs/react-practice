import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Post } from '@/components/Post'
import { usePost } from '@/hooks/use-posts'

export const postRoute = createFileRoute('/post')({
  component: PostPage,
})

function PostPage() {
  const { postId } = postRoute.useParams()
  const navigate = useNavigate()
  const { post, comments, deletePost } = usePost(Number(postId))

  if (post.isLoading || comments.isLoading) {
    return <div>Loading...</div>
  }

  if (post.isError || comments.isError) {
    return <div>Error: {post.error?.message || comments.error?.message}</div>
  }

  const handleDelete = async () => {
    await deletePost.mutateAsync()
    navigate({ to: '/posts' })
  }

  return (
    <Post
      post={post.data}
      comments={comments.data}
      onDelete={handleDelete}
    />
  )
} 