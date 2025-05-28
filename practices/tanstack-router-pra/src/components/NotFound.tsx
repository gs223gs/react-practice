import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">ページが見つかりませんでした</p>
      <Link to="/">
        <Button>ホームに戻る</Button>
      </Link>
    </div>
  )
} 