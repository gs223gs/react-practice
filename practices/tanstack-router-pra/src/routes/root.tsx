import { Outlet } from '@tanstack/react-router'
import { Header } from '@/components/Header'

export function Root() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
} 