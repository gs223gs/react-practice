import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelloWorld } from './HelloWorld'

describe('HelloWorld', () => {
  it('should render Hello World text', () => {
    render(<HelloWorld />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Hello World')
  })
}) 