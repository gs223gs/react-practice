# TanStack Router ネストしたルート実装

## 目次
1. [ネストしたルートの基本概念](#ネストしたルートの基本概念)
2. [レイアウトの実装](#レイアウトの実装)
3. [ネストしたルートの定義](#ネストしたルートの定義)
4. [データローディング](#データローディング)
5. [メソッド一覧](#メソッド一覧)

## ネストしたルートの基本概念

### ネストしたルートの利点
1. **コードの整理**
   - 関連するルートをグループ化
   - 共通のレイアウトを共有
   - メンテナンス性の向上

2. **パフォーマンスの最適化**
   - 必要なコンポーネントのみをレンダリング
   - データの効率的なローディング
   - キャッシュの最適化

### 実装パターン
1. **レイアウトベース**
   - 共通のレイアウトを持つルート
   - ヘッダー、フッター、サイドバー等

2. **機能ベース**
   - 特定の機能に関連するルート
   - ダッシュボード、設定、プロファイル等

## レイアウトの実装

### 1. ベースレイアウトの作成

```typescript
/**
 * ベースレイアウトコンポーネント
 * @param {ReactNode} children - 子コンポーネント
 */
export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

### 2. 機能別レイアウトの作成

```typescript
/**
 * ダッシュボードレイアウトコンポーネント
 * @param {ReactNode} children - 子コンポーネント
 */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <BaseLayout>
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </BaseLayout>
  )
}
```

## ネストしたルートの定義

### 1. ルートの定義

```typescript
/**
 * ルートツリーの定義
 * @property {Route} rootRoute - ルートルート
 * @property {Route[]} children - 子ルート
 */
const routeTree = rootRoute.addChildren([
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
          {
            path: '/',
            component: DashboardHome,
          },
          {
            path: '/settings',
            component: DashboardSettings,
          },
        ],
      },
      {
        path: '/profile',
        component: ProfileLayout,
        children: [
          {
            path: '/',
            component: ProfileView,
          },
          {
            path: '/edit',
            component: ProfileEdit,
          },
        ],
      },
    ],
  },
])
```

### 2. アウトレットの実装

```typescript
/**
 * アウトレットコンポーネント
 * ネストしたルートのコンテンツを表示
 */
export function Outlet() {
  const { outlet } = useRouter()
  return outlet
}
```

## データローディング

### 1. ローダーの定義

```typescript
/**
 * ダッシュボードデータのローダー
 * @returns {Promise<DashboardData>} ダッシュボードデータ
 */
const dashboardLoader = async () => {
  const [stats, recentActivity] = await Promise.all([
    api.dashboard.getStats(),
    api.dashboard.getRecentActivity(),
  ])
  return { stats, recentActivity }
}

/**
 * ダッシュボードルートの定義
 */
const dashboardRoute = createRoute({
  path: '/dashboard',
  component: DashboardLayout,
  loader: dashboardLoader,
  children: [
    // 子ルートの定義
  ],
})
```

### 2. データの使用

```typescript
/**
 * ダッシュボードホームコンポーネント
 */
export function DashboardHome() {
  const { data } = useLoaderData<typeof dashboardLoader>()

  return (
    <div>
      <Stats data={data.stats} />
      <RecentActivity data={data.recentActivity} />
    </div>
  )
}
```

## メソッド一覧

### ルーティング関連
- `createRoute()`: ルートの作成
- `useRouter()`: ルーターのフック
- `useLoaderData()`: ローダーデータの取得
- `Outlet`: ネストしたルートの表示

### レイアウト関連
- `BaseLayout`: ベースレイアウトコンポーネント
- `DashboardLayout`: ダッシュボードレイアウト
- `ProfileLayout`: プロファイルレイアウト

### データローディング
- `dashboardLoader`: ダッシュボードデータのローダー
- `useLoaderData()`: ローダーデータのフック
- `useQuery()`: データフェッチングのフック 