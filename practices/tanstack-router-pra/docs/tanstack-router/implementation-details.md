# TanStack Router実装詳細

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