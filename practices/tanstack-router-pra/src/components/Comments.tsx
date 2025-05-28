import { Comment as CommentType } from '@/lib/api'
import { Comment } from './Comment'

type CommentsProps = {
  comments: CommentType[]
}

export function Comments({ comments }: CommentsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
} 