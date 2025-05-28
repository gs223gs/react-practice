import { Comment as CommentType } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CommentProps = {
  comment: CommentType
}

export function Comment({ comment }: CommentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{comment.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{comment.body}</p>
        <p className="mt-2 text-xs text-muted-foreground">{comment.email}</p>
      </CardContent>
    </Card>
  )
} 