import { useState } from 'react'

interface CounterProps {
  initialValue?: number
  onCountChange?: (count: number) => void
}

export function Counter({ initialValue = 0, onCountChange }: CounterProps) {
  const [count, setCount] = useState(initialValue)

  const increment = () => {
    const newCount = count + 1
    setCount(newCount)
    onCountChange?.(newCount)
  }

  const decrement = () => {
    const newCount = count - 1
    setCount(newCount)
    onCountChange?.(newCount)
  }

  return (
    <div>
      <h2 data-testid="count">Count: {count}</h2>
      <button data-testid="increment" onClick={increment}>
        Increment
      </button>
      <button data-testid="decrement" onClick={decrement}>
        Decrement
      </button>
    </div>
  )
} 