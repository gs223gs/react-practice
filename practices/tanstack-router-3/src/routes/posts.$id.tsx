import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/data'

export const Route = createFileRoute('/posts/$id')({
  component: RouteComponent,
})

type Params = {
  id: string
}

function RouteComponent({ params }: { params: Params }) {
  const post = posts.find((post) => post.id === params.id)
  console.log("post")
  if (!post) {
    return <div>Post not found</div>
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500">{post.content}</p>
    </div>
  )
}
