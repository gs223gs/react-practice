# React + TanStack Router 実務レベルのフォルダ構成

## プロジェクト構造

```
src/
├── routes/                 # ルート定義
│   ├── __root.tsx         # ルートレイアウト
│   ├── index.tsx          # トップページ
│   ├── _auth/             # 認証関連のルート
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── _dashboard/        # ダッシュボード関連のルート
│   │   ├── index.tsx
│   │   └── settings.tsx
│   └── _error.tsx         # エラーページ
├── components/            # 共通コンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── layout/           # レイアウトコンポーネント
│       ├── Header.tsx
│       └── Sidebar.tsx
├── features/             # 機能単位のコンポーネント
│   ├── auth/            # 認証機能
│   │   ├── components/
│   │   └── hooks/
│   └── dashboard/       # ダッシュボード機能
│       ├── components/
│       └── hooks/
├── hooks/               # カスタムフック
│   ├── useAuth.ts
│   └── useTheme.ts
├── lib/                 # ユーティリティ関数
│   ├── api.ts          # APIクライアント
│   └── utils.ts        # 汎用ユーティリティ
├── types/              # 型定義
│   ├── api.ts
│   └── models.ts
└── styles/             # スタイル定義
    ├── globals.css
    └── themes/
```

## 各ディレクトリの役割と詳細

### `routes/`

ルート定義を管理するディレクトリです。TanStack Routerの特徴を活かした構造になっています。

#### `__root.tsx`
```tsx
// アプリケーションのルートレイアウト
// グローバルな状態管理やプロバイダーの設定
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet /> {/* 子ルートのレンダリング位置 */}
      </ThemeProvider>
    </QueryClientProvider>
  ),
})
```

#### `_auth/login.tsx`
```tsx
// 認証関連のルート定義
// ログインページのルート設定
export const Route = createFileRoute('/auth/login')({
  // ログインページのローダー
  loader: async () => {
    // 認証状態の確認
    const isAuthenticated = await checkAuth()
    if (isAuthenticated) {
      // 認証済みの場合はダッシュボードにリダイレクト
      throw redirect({ to: '/dashboard' })
    }
    return {}
  },
  // ログインページのコンポーネント
  component: () => <LoginPage />
})
```

### `components/`

再利用可能なコンポーネントを管理するディレクトリです。

#### `ui/Button.tsx`
```tsx
// 基本UIコンポーネント
// アプリケーション全体で使用するボタンコンポーネント
interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  ...props
}) => {
  // スタイルの適用
  const styles = useButtonStyles(variant, size)
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
```

### `features/`

機能単位でコンポーネントを管理するディレクトリです。

#### `auth/components/LoginForm.tsx`
```tsx
// 認証機能のログインフォームコンポーネント
// ログイン処理のロジックとUIを管理
export const LoginForm: React.FC = () => {
  // フォームの状態管理
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })

  // ログイン処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ログイン処理の実行
    await login(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームのUI */}
    </form>
  )
}
```

### `hooks/`

カスタムフックを管理するディレクトリです。

#### `useAuth.ts`
```tsx
// 認証状態を管理するカスタムフック
// ユーザーの認証状態と認証関連の操作を提供
export const useAuth = () => {
  // 認証状態の管理
  const [user, setUser] = useState<User | null>(null)
  
  // ログイン処理
  const login = async (credentials: LoginCredentials) => {
    // ログイン処理の実装
  }
  
  // ログアウト処理
  const logout = async () => {
    // ログアウト処理の実装
  }

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }
}
```

### `lib/`

ユーティリティ関数やAPIクライアントを管理するディレクトリです。

#### `api.ts`
```tsx
// APIクライアントの設定
// リクエストの共通処理やエラーハンドリングを実装
const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
})

// リクエストインターセプター
api.interceptors.request.use((config) => {
  // 認証トークンの付与
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// レスポンスインターセプター
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーハンドリング
    if (error.response?.status === 401) {
      // 認証エラーの処理
    }
    return Promise.reject(error)
  }
)
```

### `types/`

TypeScriptの型定義を管理するディレクトリです。

#### `models.ts`
```tsx
// アプリケーションで使用する型定義
// データモデルの型を定義

// ユーザー情報の型定義
interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
}

// APIレスポンスの型定義
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}
```

## ベストプラクティス

1. **ルートの設計**
   - 関連するルートは`_`プレフィックスでグループ化
   - レイアウトを共有するルートは同じディレクトリに配置

2. **コンポーネントの分割**
   - 機能単位でコンポーネントを分割
   - 再利用可能なコンポーネントは`components`に配置
   - 特定の機能に紐づくコンポーネントは`features`に配置

3. **状態管理**
   - グローバルな状態は`__root.tsx`で管理
   - 機能固有の状態はカスタムフックで管理

4. **型定義**
   - 共通の型は`types`ディレクトリで管理
   - コンポーネント固有の型は該当コンポーネントで定義

5. **エラーハンドリング**
   - エラーページは`_error.tsx`で一元管理
   - APIエラーは`lib/api.ts`で共通処理 