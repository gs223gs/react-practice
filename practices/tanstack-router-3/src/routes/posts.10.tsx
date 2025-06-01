import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../lib/data'

export const Route = createFileRoute('/posts/10')({
  component: RouteComponent,
})

function RouteComponent() {
  const post = posts.find((post) => post.id === "10")
  console.log("post")
  if (!post) {
    return <div>Post not found</div>
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
