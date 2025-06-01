import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/tests')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Tests</h1>
    </div>
  )
}
