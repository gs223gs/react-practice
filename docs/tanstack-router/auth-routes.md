# TanStack Router 認証付きルート実装

## 目次
1. [認証の基本概念](#認証の基本概念)
2. [認証状態の管理](#認証状態の管理)
3. [保護されたルートの実装](#保護されたルートの実装)
4. [認証フローの実装](#認証フローの実装)
5. [メソッド一覧](#メソッド一覧)

## 認証の基本概念

### 認証の種類
1. **セッションベース認証**
   - サーバーサイドでセッションを管理
   - セッションIDをCookieで保持
   - セキュアだが、スケーラビリティに課題

2. **トークンベース認証（JWT）**
   - クライアントサイドでトークンを保持
   - ステートレスな認証
   - スケーラブルだが、トークンの管理に注意

### 認証状態の管理方法
1. **グローバルステート**
   - Zustand/Redux等で認証状態を管理
   - アプリケーション全体で認証状態を共有

2. **コンテキスト**
   - React Contextで認証状態を管理
   - コンポーネントツリー全体で認証状態を共有

## 認証状態の管理

### 1. 認証コンテキストの作成

```typescript
/**
 * 認証コンテキストの型定義
 * @property {User | null} user - 現在のユーザー情報
 * @property {boolean} isAuthenticated - 認証状態
 * @property {() => Promise<void>} login - ログイン関数
 * @property {() => void} logout - ログアウト関数
 */
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
}

/**
 * 認証コンテキストの作成
 * @returns {AuthContextType} 認証コンテキスト
 */
const AuthContext = createContext<AuthContextType | null>(null)
```

### 2. 認証プロバイダーの実装

```typescript
/**
 * 認証プロバイダーコンポーネント
 * @param {ReactNode} children - 子コンポーネント
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // 認証状態の管理
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  /**
   * ログイン処理
   * @param {Credentials} credentials - 認証情報
   */
  const login = async (credentials: Credentials) => {
    try {
      const response = await api.auth.login(credentials)
      setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error('ログインに失敗しました')
    }
  }

  /**
   * ログアウト処理
   */
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 保護されたルートの実装

### 1. 認証ガードの作成

```typescript
/**
 * 認証ガードコンポーネント
 * @param {ReactNode} children - 保護されたコンポーネント
 */
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
```

### 2. 保護されたルートの定義

```typescript
/**
 * 保護されたルートの定義
 * @property {string} path - ルートパス
 * @property {ReactNode} component - ルートコンポーネント
 */
const protectedRoute = createRoute({
  path: '/protected',
  component: () => (
    <AuthGuard>
      <ProtectedComponent />
    </AuthGuard>
  ),
})
```

## 認証フローの実装

### 1. ログインページの実装

```typescript
/**
 * ログインページコンポーネント
 */
export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  /**
   * ログインフォームの送信処理
   * @param {FormData} data - フォームデータ
   */
  const handleSubmit = async (data: FormData) => {
    try {
      await login(data)
      navigate('/dashboard')
    } catch (error) {
      // エラー処理
    }
  }

  return (
    <LoginForm onSubmit={handleSubmit} />
  )
}
```

### 2. 認証状態の永続化

```typescript
/**
 * 認証状態の永続化処理
 */
const persistAuth = () => {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user, isAuthenticated])
}
```

## メソッド一覧

### 認証関連
- `useAuth()`: 認証コンテキストのフック
- `login(credentials)`: ログイン処理
- `logout()`: ログアウト処理
- `isAuthenticated`: 認証状態の確認

### ルーティング関連
- `AuthGuard`: 認証ガードコンポーネント
- `protectedRoute`: 保護されたルートの定義
- `useNavigate()`: ナビゲーションフック

### 状態管理
- `useState<User | null>(null)`: ユーザー状態の管理
- `useState<boolean>(false)`: 認証状態の管理
- `persistAuth()`: 認証状態の永続化 