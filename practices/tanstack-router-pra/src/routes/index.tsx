import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'
import { NotFound } from '../components/NotFound'
import { postsRoute } from './posts'
import { postRoute } from './post'
import { createPostRoute } from './create-post'
import { editPostRoute } from './edit-post'

const routeTree = rootRoute.addChildren([
  postsRoute,
  postRoute,
  createPostRoute,
  editPostRoute,
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
