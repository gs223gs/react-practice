# Storybook 応用ガイド

## 目次
1. [アドオンの活用](#アドオンの活用)
2. [カスタムアドオンの作成](#カスタムアドオンの作成)
3. [高度なストーリー設定](#高度なストーリー設定)
4. [パフォーマンス最適化](#パフォーマンス最適化)

## アドオンの活用

### 1. 主要なアドオン

- **@storybook/addon-essentials**
  - Controls: プロパティの動的な変更
  - Actions: イベントハンドラーのテスト
  - Viewport: レスポンシブデザインのテスト
  - Backgrounds: 背景色の変更
  - Docs: ドキュメントの自動生成

- **@storybook/addon-interactions**
  - インタラクションテスト
  - ユーザー操作のシミュレーション
  - 非同期処理のテスト

- **@storybook/addon-a11y**
  - アクセシビリティのチェック
  - WCAG準拠の確認
  - アクセシビリティレポートの生成

### 2. アドオンの設定

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
};
```

## カスタムアドオンの作成

### 1. アドオンの基本構造

```typescript
// .storybook/addons/my-addon.ts
import { addons } from '@storybook/addons';
import { STORY_CHANGED } from '@storybook/core-events';

const channel = addons.getChannel();

channel.on(STORY_CHANGED, () => {
  // カスタムロジック
});
```

### 2. アドオンの登録

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  addons: [
    // ... 他のアドオン
    './.storybook/addons/my-addon.ts',
  ],
};
```

## 高度なストーリー設定

### 1. デコレーターの活用

```typescript
// Button.stories.tsx
const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f8f8' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
};
```

### 2. パラメータの設定

```typescript
const meta = {
  parameters: {
    docs: {
      description: {
        component: 'ボタンコンポーネントの詳細な説明',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '360px',
            height: '640px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
    },
  },
};
```

## パフォーマンス最適化

### 1. ビルド設定の最適化

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'vite.config.ts',
        optimizeDeps: {
          include: ['react', 'react-dom'],
        },
      },
    },
  },
};
```

### 2. キャッシュの活用

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  core: {
    builder: {
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
};
```

### 3. コード分割の設定

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  },
};
```

## 高度なトラブルシューティング

### 1. パフォーマンス問題

- **ビルド時間の最適化**
  - 不要なアドオンの削除
  - キャッシュの活用
  - コード分割の設定

- **メモリ使用量の最適化**
  - 大きなコンポーネントの分割
  - 不要なストーリーの削除
  - 画像の最適化

### 2. 互換性の問題

- **バージョンの競合**
  - パッケージのバージョン確認
  - 依存関係の整理
  - 互換性のあるバージョンの使用

- **設定の競合**
  - 設定ファイルの整理
  - 優先順位の設定
  - エラーログの確認 