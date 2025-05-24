# Vitest 入門ガイド

## 目次
1. [Vitestとは](#vitestとは)
2. [基本的な使い方](#基本的な使い方)
3. [テストの書き方](#テストの書き方)
4. [基本的なトラブルシューティング](#基本的なトラブルシューティング)

## Vitestとは

Vitestは、Viteベースの高速なユニットテストフレームワークです。
主な特徴：
- Viteの高速な開発サーバーを活用
- Jest互換のAPI
- TypeScriptのネイティブサポート
- ホットリロード対応
- 並列テスト実行

## 基本的な使い方

### 1. インストール

```bash
# 基本パッケージのインストール
npm install --save-dev vitest @vitest/ui

# テスト用の追加パッケージ
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. 設定ファイルの作成

`vitest.config.ts`:
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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
      all: true,
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### 3. セットアップファイルの作成

`src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// カスタムマッチャーの追加
expect.extend(matchers)

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup()
})
```

### 4. スクリプトの追加

`package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## テストの書き方

### 1. 基本的なテスト

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### 2. テストの種類

1. **ユニットテスト**: 個々の関数やコンポーネントのテスト
2. **統合テスト**: 複数のコンポーネントの連携テスト
3. **E2Eテスト**: エンドツーエンドのテスト

### 3. テストの構造

```typescript
describe('コンポーネント名', () => {
  // 前処理
  beforeEach(() => {
    // セットアップ
  })

  // 後処理
  afterEach(() => {
    // クリーンアップ
  })

  // テストケース
  it('テストの説明', () => {
    // テストの実装
  })
})
```

## 基本的なトラブルシューティング

1. **テストが実行されない場合**
   - ファイル名が正しいか確認（`.test.ts`または`.spec.ts`）
   - テストファイルが正しいディレクトリにあるか確認
   - 設定ファイルのパスが正しいか確認

2. **モックが機能しない場合**
   - `vi.fn()`の使用方法を確認
   - モックのリセットが必要か確認
   - 非同期処理の扱いを確認

3. **カバレッジレポートが生成されない場合**
   - `@vitest/coverage-v8`がインストールされているか確認
   - 設定ファイルの`coverage`オプションを確認
   - テストが正しく実行されているか確認 