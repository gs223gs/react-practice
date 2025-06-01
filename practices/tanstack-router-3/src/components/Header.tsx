import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>
        <div className="px-2 font-bold">
          <Link to="/test/about">About</Link>
        </div>
        <div className="px-2 font-bold">
          <Link to="/posts">Posts</Link>
        </div>
        <div className="px-2 font-bold">
          <Link to="/posts/tests">Tests</Link>
        </div>
        <div className="px-2 font-bold">
          <Link to="/posts/10">Post 10</Link>
        </div>
      </nav>
    </header>
  )
}
