# TanStack Router プロジェクト構造説明

## プロジェクト概要
このプロジェクトは、TanStack Routerを使用したReact TypeScriptアプリケーションです。モダンなルーティング機能と型安全性を備えたSPAを実装しています。

## ディレクトリ構造

### ルートディレクトリ
- `package.json`: プロジェクトの依存関係とスクリプトを管理
- `vite.config.js`: Viteの設定ファイル
- `tsconfig.json`: TypeScriptの設定ファイル
- `eslint.config.js`: ESLintの設定ファイル
- `prettier.config.js`: Prettierの設定ファイル
- `components.json`: shadcn/uiのコンポーネント設定
- `index.html`: アプリケーションのエントリーポイントHTML

### src/ ディレクトリ
- `main.tsx`: アプリケーションのエントリーポイント
- `routeTree.gen.ts`: TanStack Routerのルート定義（自動生成）
- `styles.css`: グローバルスタイル
- `reportWebVitals.ts`: パフォーマンス計測用のユーティリティ

#### src/routes/
ルーティング関連のコンポーネントとロジックを格納
- 各ルートに対応するコンポーネント
- ルート固有のロジック
- ネストされたルートの定義

#### src/components/
再利用可能なUIコンポーネントを格納
- 共通コンポーネント
- レイアウトコンポーネント
- 機能コンポーネント

#### src/lib/
ユーティリティ関数や共通ロジックを格納
- ヘルパー関数
- 型定義
- 定数

#### src/integrations/
外部サービスとの統合コードを格納
- APIクライアント
- 認証関連
- その他の外部サービス統合

### public/
静的アセットを格納
- 画像
- フォント
- その他の静的ファイル

## 主要な機能
1. TanStack Routerによる型安全なルーティング
2. TypeScriptによる型安全性
3. Viteによる高速な開発環境
4. ESLintとPrettierによるコード品質管理
5. shadcn/uiによるモダンなUIコンポーネント

## 開発環境
- Node.js
- TypeScript
- Vite
- TanStack Router
- React
- ESLint
- Prettier

## セットアップと実行
1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ビルド:
```bash
npm run build
```

## 注意事項
- ルート定義は`routeTree.gen.ts`に自動生成されます
- コンポーネントの追加は`src/components/`に配置してください
- 新しいルートは`src/routes/`に追加してください
- スタイリングは`src/styles.css`で管理されています 