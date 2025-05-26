# Tanstack Router 基礎編

## 1. Tanstack Routerとは

Tanstack Routerは、Reactアプリケーションのための型安全なルーティングライブラリです。TypeScriptの型システムを最大限に活用し、開発時の安全性と開発効率を両立させています。

### 主な特徴
- 完全な型安全性
- 宣言的なルート定義
- 強力なデータローディング機能
- 柔軟なレイアウトシステム
- 優れた開発者体験

## 2. 基本的な概念

### ルート定義
- ルートは階層構造で定義
- 各ルートは独自のローダーとコンポーネントを持つ
- 型安全なパラメータ定義が可能

### データローディング
- ルートローダーによる事前データ取得
- 並行データフェッチのサポート
- エラーハンドリングの統合

### ナビゲーション
- 型安全なナビゲーション
- プログラムによる画面遷移
- 履歴管理の統合

## 3. 基本的な使用方法

### セットアップ
1. インストール
2. ルーターの初期化
3. アプリケーションへの統合

### ルート定義の基本
- 静的ルート
- 動的ルート
- ネストされたルート

### データフェッチの基本
- ローダーの定義
- データの利用
- ローディング状態の管理

## 4. ベストプラクティス

### ルート設計
- 機能単位での分割
- 適切なネスト構造
- 共通レイアウトの活用

### パフォーマンス
- 効率的なデータフェッチ
- 適切なキャッシュ戦略
- レンダリングの最適化

### エラーハンドリング
- エラー境界の設定
- 適切なエラーメッセージ
- リトライロジックの実装

```typescript
// router.ts
// ルーターのメイン設定ファイル
import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './routes/root'
import { indexRoute } from './routes/index'
import { postsRoute } from './routes/posts'
import { postRoute } from './routes/post'

// ルートツリーの構築
// 親子関係を定義し、ネストされたルーティングを実現
const routeTree = rootRoute.addChildren([
  // addChildren: 子ルートを追加するメソッド
  // 引数: 子ルートの配列
  // 戻り値: 更新されたルートツリー
  indexRoute,  // トップページ
  postsRoute.addChildren([postRoute])  // 投稿一覧と個別投稿ページのネスト
])

// ルーターのインスタンスを作成
// createRouter: ルーターインスタンスを作成するメソッド
// 引数: { routeTree: ルートツリー }
// 戻り値: ルーターインスタンス
export const router = createRouter({ routeTree })
```

```typescript
// routes/root.tsx
// アプリケーションのルートレイアウトを定義
import { createRootRoute } from '@tanstack/react-router'

// createRootRoute: ルートルートを作成するメソッド
// 引数: { component: ルートコンポーネント }
// 戻り値: ルートルートオブジェクト
export const rootRoute = createRootRoute({
  // 共通レイアウトコンポーネント
  component: () => (
    <div>
      {/* ヘッダーナビゲーション */}
      <header>
        <nav>
          {/* Link: 型安全なナビゲーションリンクコンポーネント
              引数: { to: 遷移先パス }
              戻り値: リンク要素 */}
          <Link to="/">ホーム</Link>
          <Link to="/posts">投稿一覧</Link>
        </nav>
      </header>
      {/* Outlet: 子ルートのコンテンツを表示するコンポーネント
           引数: なし
           戻り値: 子ルートのコンテンツ */}
      <Outlet />
    </div>
  ),
})
```

```typescript
// routes/posts.tsx
// 投稿一覧ページのルート定義
import { createFileRoute } from '@tanstack/react-router'

// createFileRoute: ファイルベースのルートを作成するメソッド
// 引数: (path: ルートパス)
// 戻り値: ルート定義関数
export const postsRoute = createFileRoute('/posts')({
  // データローダー: ページ表示前にデータを取得
  loader: async () => {
    // fetchPosts: 投稿データを取得するAPI呼び出し
    // 引数: なし
    // 戻り値: Promise<Post[]>
    const posts = await fetchPosts()  // APIから投稿データを取得
    return { posts }  // 取得したデータをコンポーネントに渡す
  },
  // ページコンポーネント
  component: () => {
    // useLoaderData: ローダーから取得したデータを取得するフック
    // 引数: なし
    // 戻り値: ローダーが返したデータ
    const { posts } = useLoaderData()
    return (
      <div>
        <h1>投稿一覧</h1>
        <ul>
          {/* map: 配列の各要素を変換するメソッド
               引数: (callback: 変換関数)
               戻り値: 変換後の配列 */}
          {posts.map(post => (
            <li key={post.id}>
              {/* Link: 動的ルーティング用のリンクコンポーネント
                   引数: { to: パス, params: パラメータ }
                   戻り値: リンク要素 */}
              <Link to="/posts/$postId" params={{ postId: post.id }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  },
})
```