# ライブラリのインストール

```bash
npm install @supabase/supabase-js
```

```sh
tailwindcss

shadcn
```

## 事前設定

- Supabaseの設定
  - REST Supabase拡張機能HTTPをオンにする（今回はなし、supabase.jsでやる）
  - テーブルの作成
  ```sql
  CREATE TABLE todos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    is_done boolean DEFAULT false,
    user_id uuid REFERENCES auth.users(id),
    created_at timestamp DEFAULT now()
  );
  ```
  - ポリシーの設定
  ```sql
  -- タスクの作成を許可
  CREATE POLICY "Allow authenticated users to insert their own todos"
  ON todos
  FOR INSERT
  USING (auth.uid() = user_id);

  -- 自分のタスクの読み取りを許可
  CREATE POLICY "Allow authenticated users to select their own todos"
  ON todos
  FOR SELECT
  USING (auth.uid() = user_id);

  -- 自分のタスクの更新を許可
  CREATE POLICY "Allow authenticated users to update their own todos"
  ON todos
  FOR UPDATE
  USING (auth.uid() = user_id);

  -- 自分のタスクの削除を許可
  CREATE POLICY "Allow authenticated users to delete their own todos"
  ON todos
  FOR DELETE
  USING (auth.uid() = user_id);
  ```

## OAuth 認証実装

- OAuthとは？
- GitHubでOAuthを使用する設定
- SupabaseでOAuthを使用する設定
- OAuthの実装
  - ログイン画面の実装
  - ログイン後画面の実装
  - ログインボタン / handlerの実装
  - ログイン後dashboard画面でユーザーデータ表示を実装
  - トークン関係の実装
  - ログアウトボタン / handlerの実装
  - ログイン情報をヘッダーに変更

## CRUD 実装

- 初期データの取得（useSWRを使用）
- データの更新、削除（handler内でmutate()を呼び出す）
- 更新、削除後にtoastでお知らせ
- 編集モードの実装（stateで管理、本番ではモーダルにする）
- todoitemをcardにする（本番）
- データの降順表示（orderで降順にする）
- 編集ボタンを押したら編集モードになる
- 編集モードではinputに変更する
- 確定ボタンを押したら編集モードを解除する
- shadcnの実装

## その他の実装

- type todo 作成
- 行レベルセキュリティの設計
- form 作成
- zod バリデーション作成
- SWR 作成
