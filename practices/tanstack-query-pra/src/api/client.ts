import axios from 'axios';

// APIのベースURLを定義
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Axiosインスタンスを作成し、共通の設定を適用
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 投稿データの型定義
export interface Post {
  id: number;      // 投稿の一意のID
  title: string;   // 投稿のタイトル
  body: string;    // 投稿の本文
  userId: number;  // 投稿者のID
}

// 新規投稿作成時のデータ型定義
export interface CreatePostDTO {
  title: string;   // 投稿のタイトル
  body: string;    // 投稿の本文
  userId: number;  // 投稿者のID
}

// 投稿更新時のデータ型定義（Partialを使用して全てのフィールドをオプショナルに）
export interface UpdatePostDTO extends Partial<CreatePostDTO> {
  id: number;      // 更新対象の投稿ID（必須）
} 