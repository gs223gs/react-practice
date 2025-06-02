import { useState } from 'react'

import { useAuth } from '../contexts/auth-context'

const login = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(username)
    setUsername('')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default login
