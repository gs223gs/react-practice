# Storybook 導入・活用ガイド

## 目次
1. [導入手順](#導入手順)
2. [発展的な使用方法](#発展的な使用方法)
3. [現場での実践的な使用方法](#現場での実践的な使用方法)
4. [トラブルシューティング](#トラブルシューティング)

## 導入手順

### 1. 必要なパッケージのインストール

```bash
# Storybookの基本パッケージ
npm install --save-dev @storybook/react @storybook/builder-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/blocks @storybook/testing-library

# React + Vite用のパッケージ
npm install --save-dev @storybook/react-vite

# 依存関係の競合がある場合は --legacy-peer-deps オプションを使用
npm install --save-dev @storybook/cli --legacy-peer-deps
```

### 2. 設定ファイルの作成

`.storybook/main.ts`:
```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  port: 6006,
};

export default config;
```

`.storybook/preview.ts`:
```typescript
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

### 3. package.jsonのスクリプト追加

```json
{
  "scripts": {
    "storybook": "npx storybook dev -p 6006",
    "build-storybook": "npx storybook build"
  }
}
```

## 発展的な使用方法

### 1. コンポーネントのストーリー作成

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};
```

### 2. アドオンの活用

- **Controls**: コンポーネントのプロパティを動的に変更
- **Actions**: イベントハンドラーの動作確認
- **Viewport**: レスポンシブデザインのテスト
- **Accessibility**: アクセシビリティのチェック

### 3. ドキュメントの自動生成

```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // 自動ドキュメント生成を有効化
  parameters: {
    docs: {
      description: {
        component: 'ボタンコンポーネントの説明',
      },
    },
  },
};
```

## 現場での実践的な使用方法

### 1. コンポーネント開発フロー

1. **コンポーネントの設計**
   - 要件の整理
   - プロパティの定義
   - バリエーションの決定

2. **ストーリーの作成**
   - 基本パターンの作成
   - エッジケースの考慮
   - インタラクションの定義

3. **テストの実装**
   - ユニットテスト
   - インタラクションテスト
   - スナップショットテスト

### 2. チーム開発での活用

- **コンポーネントライブラリの構築**
  - 再利用可能なコンポーネントの管理
  - バージョン管理
  - 変更履歴の追跡

- **デザインシステムとの連携**
  - デザイントークンの活用
  - スタイルガイドの統合
  - デザインレビューの効率化

### 3. CI/CDパイプラインの構築

```yaml
# .github/workflows/storybook.yml
name: Storybook
on: [push, pull_request]
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

## トラブルシューティング

### 今回発生したエラーと解決方法

1. **エラー: `storybook: command not found`**
   - 原因: StorybookのCLIツールがインストールされていない
   - 解決方法: `@storybook/cli`のインストール

2. **エラー: `Cannot find module '@storybook/react-vite/preset'`**
   - 原因: React + Vite用のパッケージが不足
   - 解決方法: `@storybook/react-vite`のインストール

3. **エラー: 依存関係の競合**
   - 原因: パッケージ間のバージョンの不一致
   - 解決方法: `--legacy-peer-deps`オプションの使用

### shadcnコンポーネントのスタイリング問題

| 変更点 | 原因 | 理由 | 解決方法 |
|--------|------|------|----------|
| `.storybook/preview.ts`にグローバルスタイルを追加 | shadcnコンポーネントのスタイルが適用されていない | グローバルCSSが読み込まれていなかった | `import '../src/index.css'`を追加してグローバルスタイルをインポート |
| `.storybook/main.ts`にTailwind CSS設定を追加 | Tailwind CSSのスタイルが適用されていない | StorybookがTailwind CSSの設定を認識していなかった | `viteFinal`オプションでTailwind CSSとPostCSSの設定を追加 |
| `App.stories.tsx`にデコレーターを追加 | コンポーネントのレイアウトが崩れていた | コンテナの幅とパディングが適切に設定されていなかった | `decorators`オプションでコンポーネントをラップするdivを追加 |
| 必要なパッケージのインストール | Tailwind CSSの依存関係が不足 | スタイリングに必要なパッケージがインストールされていなかった | `tailwindcss`、`postcss`、`autoprefixer`をインストール |

### 実装手順

1. **グローバルスタイルの追加**
```typescript
// .storybook/preview.ts
import '../src/index.css';

const preview: Preview = {
  // ... 既存の設定
};
```

2. **Tailwind CSS設定の追加**
```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  // ... 既存の設定
  viteFinal: async (config) => {
    return {
      ...config,
      css: {
        ...config.css,
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    };
  },
};
```

3. **ストーリーデコレーターの追加**
```typescript
// App.stories.tsx
const meta = {
  // ... 既存の設定
  decorators: [
    (Story) => (
      <div className="w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
};
```

4. **必要なパッケージのインストール**
```bash
npm install --save-dev tailwindcss postcss autoprefixer --legacy-peer-deps
```

### 注意点

1. **グローバルスタイル**
   - グローバルスタイルは必ず`preview.ts`でインポートする
   - パスはプロジェクトの構造に合わせて適切に設定する

2. **Tailwind CSS設定**
   - `viteFinal`オプションで設定を追加する
   - PostCSSの設定も忘れずに行う

3. **コンポーネントのラッピング**
   - デコレーターを使用して適切なレイアウトを提供する
   - コンポーネントの使用コンテキストを考慮したスタイリングを行う

4. **依存関係**
   - 必要なパッケージはすべて`devDependencies`にインストールする
   - バージョンの競合がある場合は`--legacy-peer-deps`オプションを使用する

### 一般的なトラブルシューティング

1. **ビルドエラー**
   - キャッシュのクリア: `npm run storybook -- --no-manager-cache`
   - 依存関係の再インストール: `npm ci`

2. **表示の問題**
   - ブラウザのキャッシュクリア
   - Storybookの再起動

3. **パフォーマンスの問題**
   - 不要なストーリーの削除
   - ビルド設定の最適化

### ベストプラクティス

1. **プロジェクト構造**
   ```
   src/
   ├── components/
   │   ├── Button/
   │   │   ├── Button.tsx
   │   │   ├── Button.stories.tsx
   │   │   └── Button.test.tsx
   │   └── ...
   └── ...
   ```

2. **命名規則**
   - コンポーネント: PascalCase
   - ストーリーファイル: `ComponentName.stories.tsx`
   - ストーリー名: 説明的な名前を使用

3. **ドキュメント**
   - コンポーネントの目的と使用方法
   - プロパティの説明
   - 使用例の提供

4. **テスト**
   - ユニットテスト
   - インタラクションテスト
   - スナップショットテスト
   - アクセシビリティテスト 