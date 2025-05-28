import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PostForm } from '@/components/PostForm'
import { usePost } from '@/hooks/use-posts'
import type { PostFormData } from '@/lib/schemas'

export const editPostRoute = createFileRoute('/edit-post')({
  component: EditPostPage,
})

function EditPostPage() {
  const { postId } = editPostRoute.useParams()
  const navigate = useNavigate()
  const { post, updatePost } = usePost(Number(postId))

  if (post.isLoading) {
    return <div>Loading...</div>
  }

  if (post.isError) {
    return <div>Error: {post.error.message}</div>
  }

  const handleSubmit = async (data: PostFormData) => {
    await updatePost.mutateAsync(data)
    navigate({ to: `/posts/${postId}` })
  }

  return <PostForm defaultValues={post.data} mode="edit" onSubmit={handleSubmit} />
} 