# TanStack Router実装詳細

## 実装手順の背景

### 1. 技術選定の理由

#### TanStack Router
- **目的**: 型安全なルーティングを実現し、開発時のエラーを最小限に抑える
- **利点**: 
  - TypeScriptとの完全な統合
  - パラメータの型安全性
  - ルート定義の一元管理
  - パフォーマンスの最適化

#### TanStack Query
- **目的**: サーバー状態の管理を効率化し、データフェッチングの複雑さを軽減
- **利点**:
  - キャッシュ管理の自動化
  - データの再検証の簡素化
  - エラーハンドリングの統一
  - ローディング状態の管理

#### shadcn/ui
- **目的**: 一貫性のあるUIコンポーネントを提供し、開発効率を向上
- **利点**:
  - カスタマイズ可能なコンポーネント
  - アクセシビリティの考慮
  - テーマの柔軟な変更
  - モダンなデザイン

### 2. 実装手順の根拠

1. **プロジェクトの初期設定**
   - 各ライブラリの設定を最初に行うことで、後続の実装で一貫性を保証
   - 開発環境の統一により、チーム開発の効率化を実現

2. **コンポーネントの実装**
   - 共通コンポーネントから実装することで、再利用性を確保
   - 機能ごとのコンポーネント分割により、保守性を向上

3. **カスタムフックの実装**
   - ビジネスロジックの分離により、コンポーネントの責務を明確化
   - データフェッチングのロジックを集約し、再利用性を向上

4. **ルーティングの実装**
   - アプリケーションの構造を明確に定義
   - ナビゲーションの一貫性を確保

## 外部ライブラリの詳細

### TanStack Router

#### 概要
TanStack Routerは、TypeScriptファーストのルーティングライブラリです。型安全性とパフォーマンスを重視した設計となっています。

#### 主要な機能
- **型安全なルーティング**
  ```typescript
  /**
   * ルートパラメータの型定義
   * @param {string} id - 投稿ID
   * @returns {string} ルートパス
   */
  const postRoute = createRoute({
    path: '/posts/$id',
    parseParams: (params) => ({
      id: Number(params.id),
    }),
    stringifyParams: (params) => ({
      id: String(params.id),
    }),
  })
  ```

- **ルート定義**
  ```typescript
  /**
   * ルートツリーの定義
   * @property {Route} rootRoute - ルートルート
   * @property {Route[]} children - 子ルート
   */
  const routeTree = rootRoute.addChildren([
    postsRoute,
    postRoute,
    createPostRoute,
    editPostRoute,
  ])
  ```

### TanStack Query

#### 概要
TanStack Queryは、サーバー状態の管理に特化したライブラリです。データフェッチング、キャッシュ管理、エラーハンドリングを統合的に提供します。

#### 主要な機能
- **クエリ定義**
  ```typescript
  /**
   * 投稿一覧の取得
   * @returns {QueryResult<Post[]>} 投稿一覧のクエリ結果
   */
  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: api.posts.getAll,
  })
  ```

- **ミューテーション**
  ```typescript
  /**
   * 投稿の作成
   * @param {Omit<Post, 'id'>} post - 作成する投稿データ
   * @returns {MutationResult} ミューテーション結果
   */
  const createPost = useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
  ```

### shadcn/ui

#### 概要
shadcn/uiは、Radix UIをベースにした、カスタマイズ可能なUIコンポーネントライブラリです。

#### 主要なコンポーネント
- **Card**
  ```typescript
  /**
   * カードコンポーネント
   * @property {ReactNode} children - カードの内容
   * @property {string} className - カスタムクラス名
   */
  <Card className="h-full hover:bg-muted/50">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{content}</CardContent>
  </Card>
  ```

- **Button**
  ```typescript
  /**
   * ボタンコンポーネント
   * @property {string} variant - ボタンのバリアント（'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'）
   * @property {ReactNode} children - ボタンの内容
   */
  <Button variant="ghost">Click me</Button>
  ```

## 目次
1. [実装手順](#実装手順)
2. [コンポーネント構成](#コンポーネント構成)
3. [カスタムフック](#カスタムフック)
4. [ルーティング](#ルーティング)
5. [データフェッチング](#データフェッチング)

## 実装手順

1. プロジェクトの初期設定
   - TanStack Routerの設定
   - TanStack Queryの設定
   - shadcn/uiの設定

2. コンポーネントの実装
   - 共通コンポーネント（Header）
   - 投稿関連コンポーネント（Posts, Post, PostForm）
   - コメント関連コンポーネント（Comments, Comment）

3. カスタムフックの実装
   - 投稿関連のフック（usePosts, usePost）
   - データフェッチングとミューテーションの管理

4. ルーティングの実装
   - ルート定義
   - パラメータの設定
   - ナビゲーションの実装

## コンポーネント構成

### Header
```typescript
export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/posts">
            <Button variant="ghost">Posts</Button>
          </Link>
          <Link to="/posts/create">
            <Button variant="ghost">Create Post</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- 機能：アプリケーションのヘッダーナビゲーション
- 使用コンポーネント：
  - `Link`：TanStack Routerのナビゲーション
  - `Button`：shadcn/uiのボタンコンポーネント

### Posts
```typescript
export function Posts({ posts }: PostsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link to="/posts/create">
          <Button>Create Post</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <Card className="h-full hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">
                  {post.body}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- 機能：投稿一覧の表示
- Props：
  - `posts`: Post[] - 表示する投稿の配列
- 使用コンポーネント：
  - `Card`：投稿カード
  - `Link`：投稿詳細へのリンク

### Post
```typescript
export function Post({ post, comments, onDelete }: PostProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = async (data: PostFormData) => {
    await api.posts.update(post.id, { ...post, ...data })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <PostForm
        defaultValues={post}
        mode="edit"
        onSubmit={handleUpdate}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>Post ID: {post.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
      <CardContent>
        <Comments comments={comments} />
      </CardContent>
    </Card>
  )
}
```

- 機能：個別の投稿の表示と編集
- Props：
  - `post`: Post - 表示する投稿
  - `comments`: Comment[] - 投稿のコメント
  - `onDelete`: () => void - 削除ハンドラー
- 状態：
  - `isEditing`: boolean - 編集モードの状態

## カスタムフック

### usePosts
```typescript
export function usePosts() {
  const queryClient = useQueryClient()

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: api.posts.getAll,
  })

  const createPost = useMutation({
    mutationFn: api.posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostFormData }) =>
      api.posts.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', id] })
    },
  })

  const deletePost = useMutation({
    mutationFn: api.posts.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
  }
}
```

- 機能：投稿一覧の取得と操作
- 戻り値：
  - `posts`: QueryResult<Post[]> - 投稿一覧のクエリ結果
  - `createPost`: MutationResult - 投稿作成のミューテーション
  - `updatePost`: MutationResult - 投稿更新のミューテーション
  - `deletePost`: MutationResult - 投稿削除のミューテーション

### usePost
```typescript
export function usePost(id: number) {
  const queryClient = useQueryClient()

  const post = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.posts.getById(id),
  })

  const comments = useQuery({
    queryKey: ['comments', id],
    queryFn: () => api.comments.getByPostId(id),
  })

  const updatePost = useMutation({
    mutationFn: (data: PostFormData) => api.posts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const deletePost = useMutation({
    mutationFn: () => api.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return {
    post,
    comments,
    updatePost,
    deletePost,
  }
}
```

- 機能：個別の投稿の取得と操作
- 引数：
  - `id`: number - 投稿ID
- 戻り値：
  - `post`: QueryResult<Post> - 投稿のクエリ結果
  - `comments`: QueryResult<Comment[]> - コメントのクエリ結果
  - `updatePost`: MutationResult - 投稿更新のミューテーション
  - `deletePost`: MutationResult - 投稿削除のミューテーション

## ルーティング

### ルート定義
```typescript
const rootRoute = createRootRoute({
  component: Root,
})

const routeTree = rootRoute.addChildren([
  postsRoute,
  postRoute,
  createPostRoute,
  editPostRoute,
])

export const router = createRouter({ routeTree })
```

- 機能：アプリケーションのルーティング設定
- ルート：
  - `/posts` - 投稿一覧
  - `/posts/:id` - 個別の投稿
  - `/posts/create` - 新規投稿作成
  - `/posts/:id/edit` - 投稿編集

## データフェッチング

### APIクライアント
```typescript
export const api = {
  posts: {
    getAll: async (): Promise<Post[]> => {
      const response = await fetch(`${BASE_URL}/posts`)
      return response.json()
    },
    getById: async (id: number): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts/${id}`)
      return response.json()
    },
    create: async (post: Omit<Post, 'id'>): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
      })
      return response.json()
    },
    update: async (id: number, post: Post): Promise<Post> => {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(post),
      })
      return response.json()
    },
    delete: async (id: number): Promise<void> => {
      await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      })
    },
  },
  comments: {
    getByPostId: async (postId: number): Promise<Comment[]> => {
      const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
      return response.json()
    },
  },
}
```

- 機能：APIとの通信
- メソッド：
  - `getAll`: 全投稿の取得
  - `getById`: 個別の投稿の取得
  - `create`: 新規投稿の作成
  - `update`: 投稿の更新
  - `delete`: 投稿の削除
  - `getByPostId`: 投稿のコメント取得 