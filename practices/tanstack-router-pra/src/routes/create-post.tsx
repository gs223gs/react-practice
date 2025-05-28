import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PostForm } from '@/components/PostForm'
import { usePosts } from '@/hooks/use-posts'
import { PostFormData } from '@/lib/schemas'

export const createPostRoute = createFileRoute('/create-post')({
  component: CreatePostPage,
})

function CreatePostPage() {
  const navigate = useNavigate()
  const { createPost } = usePosts()

  const handleSubmit = async (data: PostFormData) => {
    await createPost.mutateAsync(data)
    navigate({ to: '/posts' })
  }

  return <PostForm mode="create" onSubmit={handleSubmit} />
} 