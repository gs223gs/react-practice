import { Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/auth-context'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        {user ? (
          <>
            <div>
              <h1>{user.id}</h1>
            </div>
            <div className="px-2 font-bold">
            <button onClick={logout}>Logout</button>
          </div>
          </>
        ) : (
          <>
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
            <div className="px-2 font-bold">
              <Link to="/loginform">Login</Link>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
