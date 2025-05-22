import { useState } from 'react';
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePosts } from './hooks/usePosts';
import type { CreatePostDTO, UpdatePostDTO } from './api/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// QueryClientの設定
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5分間はデータを新鮮とみなす
      retry: 1,                 // エラー時のリトライ回数
    },
  },
});

// 投稿一覧を表示するコンポーネント
const PostList = () => {
  // カスタムフックから投稿関連の機能を取得
  const { posts, createPost, updatePost, deletePost } = usePosts();
  
  // 新規投稿用のフォーム状態
  const [newPost, setNewPost] = useState<CreatePostDTO>({
    title: '',
    body: '',
    userId: 1,
  });

  // ローディング状態の表示
  if (posts.isLoading) return <div>Loading...</div>;
  // エラー状態の表示
  if (posts.isError) return <div>Error: {posts.error.message}</div>;

  // 新規投稿の作成ハンドラー
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutate(newPost);
    setNewPost({ title: '', body: '', userId: 1 }); // フォームをリセット
  };

  // 投稿の更新ハンドラー
  const handleUpdatePost = (post: UpdatePostDTO) => {
    updatePost.mutate(post);
  };

  // 投稿の削除ハンドラー
  const handleDeletePost = (id: number) => {
    deletePost.mutate(id);
  };

  return (
    <>
      {/* React Queryの開発ツール */}
      <ReactQueryDevtools />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
      
        {/* 新規投稿フォーム */}
        <form onSubmit={handleCreatePost} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Create New Post</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              placeholder="Body"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={createPost.isPending}
            >
              {createPost.isPending ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>

        {/* 投稿一覧 */}
        <div className="space-y-4">
          {posts.data?.map((post) => (
            <div key={post.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleUpdatePost({ id: post.id, title: 'Updated Title' })}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  disabled={updatePost.isPending}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={deletePost.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// アプリケーションのルートコンポーネント
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
};

export default App;