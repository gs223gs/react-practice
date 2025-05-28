import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/posts">
            <Button variant="ghost">Posts</Button>
          </Link>
          <Link to="/posts/create">
            <Button variant="ghost">Create Post</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
