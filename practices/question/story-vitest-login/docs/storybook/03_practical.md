# Storybook 実践ガイド

## 目次
1. [チーム開発での活用](#チーム開発での活用)
2. [CI/CDパイプラインの構築](#cicdパイプラインの構築)
3. [品質管理とテスト](#品質管理とテスト)
4. [ドキュメント管理](#ドキュメント管理)

## チーム開発での活用

### 1. 開発フロー

1. **コンポーネントの設計**
   - デザインシステムの定義
   - コンポーネントの責務の明確化
   - インターフェースの設計

2. **ストーリーの作成**
   - 基本的なユースケース
   - エッジケース
   - インタラクション

3. **レビュープロセス**
   - デザインレビュー
   - コードレビュー
   - アクセシビリティレビュー

### 2. コラボレーション

- **デザイナーとの連携**
  - Figmaとの連携
  - デザイントークンの共有
  - ビジュアルフィードバック

- **開発者との連携**
  - コンポーネントの再利用
  - コードの共有
  - ベストプラクティスの共有

## CI/CDパイプラインの構築

### 1. 自動化の設定

```yaml
# .github/workflows/storybook.yml
name: Storybook
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build-storybook
      - uses: actions/upload-artifact@v2
        with:
          name: storybook
          path: storybook-static
```

### 2. デプロイメント

```yaml
# .github/workflows/deploy.yml
name: Deploy Storybook
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build-storybook
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## 品質管理とテスト

### 1. ビジュアルリグレッションテスト

```typescript
// .storybook/test-runner.ts
import { injectAxe, checkA11y } from 'axe-playwright';
import { test, expect } from '@playwright/test';

test('Storybook', async ({ page }) => {
  await page.goto('http://localhost:6006');
  await injectAxe(page);
  await checkA11y(page);
});
```

### 2. アクセシビリティテスト

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
  ],
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### 3. パフォーマンステスト

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  parameters: {
    performance: {
      maxSize: 244 * 1024, // 244KB
      hints: 'warning',
    },
  },
};
```

## ドキュメント管理

### 1. コンポーネントドキュメント

```typescript
// Button.stories.tsx
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
# Button コンポーネント

ボタンコンポーネントは、ユーザーのアクションをトリガーするために使用されます。

## 使用方法

\`\`\`tsx
import { Button } from './Button';

export default function MyComponent() {
  return <Button>Click me</Button>;
}
\`\`\`

## プロパティ

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|------------|------|--------|------------|-------------|
| variant | 'primary' \| 'secondary' | いいえ | 'primary' | ボタンのバリアント |
| size | 'sm' \| 'md' \| 'lg' | いいえ | 'md' | ボタンのサイズ |
| disabled | boolean | いいえ | false | 無効化状態 |
        `,
      },
    },
  },
};
```

### 2. デザインシステムドキュメント

```markdown
# デザインシステム

## カラーパレット

| 名前 | 値 | 使用例 |
|------|------|--------|
| Primary | #007AFF | メインアクション |
| Secondary | #5856D6 | セカンダリアクション |
| Success | #34C759 | 成功状態 |
| Warning | #FF9500 | 警告状態 |
| Error | #FF3B30 | エラー状態 |

## タイポグラフィ

| スタイル | フォントサイズ | 行の高さ | 使用例 |
|----------|----------------|------------|--------|
| Heading 1 | 32px | 40px | ページタイトル |
| Heading 2 | 24px | 32px | セクションタイトル |
| Body | 16px | 24px | 本文 |
| Caption | 14px | 20px | 補足テキスト |

## スペーシング

| 名前 | 値 | 使用例 |
|------|------|--------|
| xs | 4px | アイコン間の間隔 |
| sm | 8px | 要素間の間隔 |
| md | 16px | セクション間の間隔 |
| lg | 24px | 大きなセクション間の間隔 |
| xl | 32px | ページセクション間の間隔 |
```

### 3. ガイドライン

```markdown
# コンポーネント開発ガイドライン

## 命名規則

- コンポーネント名は PascalCase
- ファイル名はコンポーネント名と一致
- ストーリーファイルは `.stories.tsx` で終わる

## ファイル構造

```
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx
      Button.test.tsx
      index.ts
```

## コーディング規約

- TypeScriptの型定義を必ず行う
- プロパティのデフォルト値を設定
- アクセシビリティを考慮した実装
- パフォーマンスを考慮した実装

## テスト要件

- ユニットテストの作成
- ビジュアルリグレッションテストの作成
- アクセシビリティテストの作成
- パフォーマンステストの作成
``` 