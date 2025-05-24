# Vitest環境構築とテスト実装手順

## 1. 必要なパッケージのインストール

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## 2. 設定ファイルの作成

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### src/test/setup.ts
```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

## 3. package.jsonの更新

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

## 4. テストファイルの作成

### src/App.test.tsx
```typescript
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
```

## 5. テストの実行

```bash
npm test
```

## 注意点

1. テストケースの作成時は、実際のコンポーネントの構造に合わせて要素を特定する
2. 非同期処理を含むテストは`waitFor`を使用して適切に待機する
3. コンソールログのテストは`vi.spyOn`を使用してモックする
4. テスト終了後は`mockRestore()`でモックを元に戻す

## トラブルシューティング

1. テストが失敗する場合：
   - コンポーネントの構造とテストの期待値が一致しているか確認
   - 非同期処理が適切に待機されているか確認
   - モックが正しく設定されているか確認

2. 環境構築でエラーが発生する場合：
   - パッケージのバージョンの互換性を確認
   - 設定ファイルが正しい場所に配置されているか確認
   - 必要なパッケージがすべてインストールされているか確認 