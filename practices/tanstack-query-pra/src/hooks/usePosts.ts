import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/posts';

// クエリキーの定義（キャッシュの識別子として使用）
export const POSTS_QUERY_KEY = ['posts'] as const;

// 投稿関連の操作をまとめたカスタムフック
export const usePosts = () => {
  // QueryClientのインスタンスを取得（キャッシュの管理に使用）
  const queryClient = useQueryClient();

  // 投稿一覧を取得するクエリ
  const posts = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: postsApi.getAll,
  });

  // 新規投稿を作成するミューテーション
  const createPost = useMutation({
    mutationFn: postsApi.create,
    onSuccess: () => {
      // 投稿作成成功時に投稿一覧のキャッシュを無効化し、再取得をトリガー
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });

  // 投稿を更新するミューテーション
  const updatePost = useMutation({
    mutationFn: postsApi.update,
    onSuccess: () => {
      // 更新成功時に投稿一覧のキャッシュを無効化し、再取得をトリガー
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });

  // 投稿を削除するミューテーション
  const deletePost = useMutation({
    mutationFn: postsApi.delete,
    onSuccess: () => {
      // 削除成功時に投稿一覧のキャッシュを無効化し、再取得をトリガー
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
  });

  return {
    posts,
    createPost,
    updatePost,
    deletePost,
  };
}; 