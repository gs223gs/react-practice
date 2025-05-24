# Vitest 応用ガイド

## 目次
1. [高度なテスト手法](#高度なテスト手法)
2. [モックとスタブ](#モックとスタブ)
3. [非同期テスト](#非同期テスト)
4. [カスタムマッチャー](#カスタムマッチャー)

## 高度なテスト手法

### 1. テストの分離と共有

```typescript
// test-utils.tsx
import { render as rtlRender } from '@testing-library/react'
import { ReactElement } from 'react'

function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

export * from '@testing-library/react'
export { render }
```

### 2. テストデータの管理

```typescript
// test-data.ts
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
}

export const mockUsers = [
  mockUser,
  { id: 2, name: 'Another User', email: 'another@example.com' },
]
```

### 3. テストの並列実行

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    threads: true,
    maxThreads: 4,
    minThreads: 2,
  },
})
```

## モックとスタブ

### 1. 関数のモック

```typescript
import { vi } from 'vitest'

// 基本的なモック
const mockFn = vi.fn()

// 戻り値の設定
mockFn.mockReturnValue('mocked value')

// 非同期の戻り値
mockFn.mockResolvedValue('async value')

// エラーのスロー
mockFn.mockRejectedValue(new Error('mock error'))
```

### 2. モジュールのモック

```typescript
// APIモジュールのモック
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Mock User' }),
  updateUser: vi.fn().mockResolvedValue(true),
}))
```

### 3. タイマーのモック

```typescript
describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('handles timeout', () => {
    const callback = vi.fn()
    setTimeout(callback, 1000)
    
    vi.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalled()
  })
})
```

## 非同期テスト

### 1. Promiseのテスト

```typescript
describe('Async Operations', () => {
  it('handles successful promise', async () => {
    const result = await fetchData()
    expect(result).toBeDefined()
  })

  it('handles rejected promise', async () => {
    await expect(fetchErrorData()).rejects.toThrow()
  })
})
```

### 2. 非同期コンポーネントのテスト

```typescript
describe('AsyncComponent', () => {
  it('renders loading state', () => {
    render(<AsyncComponent />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders data after loading', async () => {
    render(<AsyncComponent />)
    await waitFor(() => {
      expect(screen.getByText('Data loaded')).toBeInTheDocument()
    })
  })
})
```

### 3. 非同期イベントのテスト

```typescript
describe('Form Submission', () => {
  it('handles form submission', async () => {
    render(<Form />)
    
    await userEvent.type(screen.getByLabelText('Name'), 'John')
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })
})
```

## カスタムマッチャー

### 1. 基本的なカスタムマッチャー

```typescript
// custom-matchers.ts
import { expect } from 'vitest'

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    return {
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass,
    }
  },
})
```

### 2. 型定義の追加

```typescript
// custom-matchers.d.ts
interface CustomMatchers {
  toBeWithinRange(floor: number, ceiling: number): CustomMatcherResult
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}
```

### 3. マッチャーの使用

```typescript
describe('Custom Matchers', () => {
  it('uses custom matcher', () => {
    expect(5).toBeWithinRange(1, 10)
    expect(15).not.toBeWithinRange(1, 10)
  })
})
```

## 高度なトラブルシューティング

### 1. テストの分離

- テスト間の依存関係を避ける
- グローバル状態のリセット
- モックの適切なリセット

### 2. パフォーマンス最適化

- テストの並列実行
- 不要なテストのスキップ
- テストデータの効率的な管理

### 3. デバッグ手法

- テストのステップ実行
- スナップショットの比較
- エラーメッセージの改善 