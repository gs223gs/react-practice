import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('フォームがレンダリングされること', () => {
    render(<App />)
    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /password/i })).toBeInTheDocument()
  })

  it('Inputが二つ Buttonが一つ表示されること', () => {
    render(<App />)
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('username password欄ともに無記入でメッセージが表示されること', async () => {
    render(<App />)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/must be at least 2 characters/i)
    expect(errorMessages).toHaveLength(2)
  })

  it('username がOK で password が falseの時に passwordのみメッセージが表示されること', async () => {
    render(<App />)
    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/must be at least 2 characters/i)
    expect(errorMessages).toHaveLength(1)
  })

  it('username がfalse で password がtrueの時に usernameのみメッセージが表示されること', async () => {
    render(<App />)
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    const errorMessages = await screen.findAllByText(/must be at least 2 characters/i)
    expect(errorMessages).toHaveLength(1)
  })

  it('username password が trueで consoleに {username: message, password: message}で表示されること', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<App />)
    
    const usernameInput = screen.getByRole('textbox', { name: /username/i })
    const passwordInput = screen.getByRole('textbox', { name: /password/i })
    const submitButton = screen.getByRole('button', { name: /submit/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpass' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpass'
      })
    })

    consoleSpy.mockRestore()
  })
}) 