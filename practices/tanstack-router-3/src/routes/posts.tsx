import {
  createFileRoute,
  Link,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { posts } from '../lib/data'

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
})

function RouteComponent() {
  const matches = useMatches()
  const isChildRoute = matches.length > 2
  console.log(isChildRoute)
  console.log(matches)
  return (
    <div>
      {!isChildRoute && (
        <div>
          <h1>Posts</h1>
          <nav>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    to="/posts/$id"
                    params={{ id: post.id }}
                    className="text-blue-500"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/posts/10" className="text-blue-500">
                  Post 10
                </Link>
              </li>
              <li>
                <Link to="/posts/tests" className="text-blue-500">
                  Tests
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {isChildRoute && <Outlet />}
    </div>
  )
}
