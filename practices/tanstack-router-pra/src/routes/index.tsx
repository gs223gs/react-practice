import { createRootRoute, createRouter } from '@tanstack/react-router'
import { Root } from './root.tsx'
import { postsRoute } from './posts.tsx'
import { postRoute } from './post.tsx'
import { createPostRoute } from './create-post.tsx'
import { editPostRoute } from './edit-post.tsx'

const rootRoute = createRootRoute({
  component: Root,
})

const routeTree = rootRoute.addChildren([
  postsRoute,
  postRoute,
  createPostRoute,
  editPostRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
