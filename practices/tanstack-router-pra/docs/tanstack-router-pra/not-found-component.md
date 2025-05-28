# TanStack Router Not Foundコンポーネントエラー

## エラー内容
```
Warning: A notFoundError was encountered on the route with ID "__root__", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)
```

## 原因
TanStack Routerで404ページ（Not Found）のコンポーネントが設定されていませんでした。具体的には：

1. ルートレベルで`notFoundComponent`が設定されていない
2. ルーター全体で`defaultNotFoundComponent`が設定されていない
3. デフォルトの`<div>Not Found</div>`が使用されていた

## 対処療法
1. カスタムのNot Foundコンポーネントを作成
   ```typescript
   // src/components/NotFound.tsx
   import { Link } from '@tanstack/react-router'
   import { Button } from './ui/button'

   export function NotFound() {
     return (
       <div className="flex flex-col items-center justify-center min-h-[60vh]">
         <h1 className="text-4xl font-bold mb-4">404</h1>
         <p className="text-xl mb-8">ページが見つかりませんでした</p>
         <Link to="/">
           <Button>ホームに戻る</Button>
         </Link>
       </div>
     )
   }
   ```

2. ルーターの設定を修正
   ```typescript
   // src/routes/index.tsx
   import { createRouter } from '@tanstack/react-router'
   import { Route as rootRoute } from './__root'
   import { NotFound } from '../components/NotFound'

   const routeTree = rootRoute

   export const router = createRouter({
     routeTree,
     defaultNotFoundComponent: NotFound,
   })
   ```

## 原因療法
1. エラーハンドリングの一元管理
   - 共通のエラーページコンポーネントを作成
   - エラーページのスタイルを統一
   - エラーページのナビゲーションを標準化

2. ルーター設定の標準化
   - デフォルトのエラーハンドリングを設定
   - ルートごとのエラーハンドリングを必要に応じて上書き
   - エラーページのコンポーネントを再利用可能に設計

## 予防策
1. プロジェクト初期設定の標準化
   - エラーページコンポーネントを初期設定に含める
   - ルーター設定のテンプレートを作成
   - エラーハンドリングのガイドラインを整備

2. 開発環境の整備
   - エラーページのプレビュー機能
   - エラーハンドリングのテスト環境
   - エラーページのスタイルガイド

3. コードレビューのポイント
   - エラーページの設定が適切か
   - エラーページのスタイルが統一されているか
   - エラーページのナビゲーションが適切か 