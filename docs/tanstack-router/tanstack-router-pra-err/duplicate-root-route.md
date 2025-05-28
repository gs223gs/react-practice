# TanStack Router 重複ルートエラー

## エラー内容
```
Uncaught Error: Invariant failed: Duplicate routes found with id: __root__
```

## 原因
TanStack Routerで`__root__`というIDを持つルートが重複して定義されていました。具体的には：

1. `src/routes/index.tsx`で`createRootRoute`を使用して手動でルートを定義
2. `src/routeTree.gen.ts`で自動生成されたルート定義

この2つの場所で同じIDのルートが定義されていたため、エラーが発生しました。

## 対処療法
1. `src/routes/index.tsx`の重複したルート定義を削除
2. 自動生成されたルート定義（`__root.tsx`）を使用するように変更

```typescript
// 修正前
import { createRootRoute, createRouter } from '@tanstack/react-router'
import { Root } from './root.tsx'
import { postsRoute } from './posts.tsx'
import { postRoute } from './post.tsx'
import { createPostRoute } from './create-post.tsx'
import { editPostRoute } from './edit-post.tsx'

const rootRoute = createRootRoute({
  component: Root,
})

const routeTree = rootRoute.addChildren([
  postsRoute,
  postRoute,
  createPostRoute,
  editPostRoute,
])

// 修正後
import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'

export const router = createRouter({ routeTree: rootRoute })
```

## 原因療法
1. TanStack Routerの自動生成機能を活用する
   - ファイルベースのルーティングを使用
   - `__root.tsx`などの命名規則に従う
2. ルート定義の一元管理
   - 手動でのルート定義を避ける
   - 自動生成されたルート定義を優先的に使用する

## 予防策
1. ルート定義の重複を避ける
   - 手動でのルート定義は最小限に
   - 自動生成されたルート定義を優先
2. ファイル構造の遵守
   - TanStack Routerの命名規則に従う
   - ルートファイルの配置を適切に行う
3. コードレビュー時の確認ポイント
   - ルート定義の重複がないか
   - 自動生成されたルート定義が正しく使用されているか 