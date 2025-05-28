import { useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Post as PostType } from '@/lib/api'
import { Comments } from './Comments'
import { PostForm } from './PostForm'
import { useState } from 'react'
import { api } from '@/lib/api'

type PostProps = {
  post: PostType
  comments: Comment[]
  onDelete: () => void
}

export function Post({ post, comments, onDelete }: PostProps) {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = async (data: PostFormData) => {
    await api.posts.update(post.id, { ...post, ...data })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <PostForm
        defaultValues={post}
        mode="edit"
        onSubmit={handleUpdate}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>Post ID: {post.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
      <CardContent>
        <Comments comments={comments} />
      </CardContent>
    </Card>
  )
} 