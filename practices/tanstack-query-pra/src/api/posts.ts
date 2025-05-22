import { apiClient } from './client';
import type { Post, CreatePostDTO, UpdatePostDTO } from './client';

// 投稿関連のAPIエンドポイントを定義
export const postsApi = {
  // 全ての投稿を取得
  getAll: async (): Promise<Post[]> => {
    const { data } = await apiClient.get<Post[]>('/posts');
    return data;
  },

  // 特定のIDの投稿を取得
  getById: async (id: number): Promise<Post> => {
    const { data } = await apiClient.get<Post>(`/posts/${id}`);
    return data;
  },

  // 新規投稿を作成
  create: async (post: CreatePostDTO): Promise<Post> => {
    const { data } = await apiClient.post<Post>('/posts', post);
    return data;
  },

  // 既存の投稿を更新
  update: async ({ id, ...post }: UpdatePostDTO): Promise<Post> => {
    const { data } = await apiClient.put<Post>(`/posts/${id}`, post);
    return data;
  },

  // 投稿を削除
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
}; 