# Storybook 入門ガイド

## 目次
1. [Storybookとは](#storybookとは)
2. [基本的な使い方](#基本的な使い方)
3. [コンポーネントの作成](#コンポーネントの作成)
4. [ストーリーの作成](#ストーリーの作成)

## Storybookとは

Storybookは、UIコンポーネントを独立して開発・テスト・ドキュメント化するためのツールです。
主な特徴：
- コンポーネントの分離開発
- インタラクティブなテスト
- 自動ドキュメント生成
- デザインシステムの構築

## 基本的な使い方

### 1. インストール

```bash
# 基本パッケージのインストール
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
import '../src/index.css'; // グローバルスタイルをインポート

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

### 3. スクリプトの追加

`package.json`:
```json
{
  "scripts": {
    "storybook": "npx storybook dev -p 6006",
    "build-storybook": "npx storybook build"
  }
}
```

## コンポーネントの作成

### 1. 基本的なコンポーネント

```typescript
// Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## ストーリーの作成

### 1. 基本的なストーリー

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

### 2. ストーリーの種類

1. **Basic Story**: 基本的な使用方法
2. **With Controls**: プロパティの動的な変更
3. **With Actions**: イベントハンドラーのテスト
4. **With Documentation**: 自動生成されるドキュメント

## 基本的なトラブルシューティング

1. **スタイルが適用されない場合**
   - グローバルスタイルのインポート確認
   - Tailwind CSSの設定確認
   - コンポーネントのラッピング確認

2. **コンポーネントが表示されない場合**
   - ストーリーファイルの配置確認
   - インポートパスの確認
   - コンポーネントのエクスポート確認

3. **ビルドエラーが発生する場合**
   - 依存関係の確認
   - 設定ファイルの構文確認
   - キャッシュのクリア 