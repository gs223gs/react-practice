# ライブラリのインストール

```bash
npm install @supabase/supabase-js
```

```sh
tailwindcss

shadcn
```

OAuth 認証実装
0.OAuth とは？
1.github で OAuth を使用する設定
2.supabase で OAuth を使用する設定
3.OAuth の実装

- ログイン画面の実装
- ログイン後画面の実装
- ログインボタン / handler の実装
- ログイン後 dashboard 画面でユーザーデータ表示を実装
- トークン関係の実装
- ログアウトボタン / handler の実装
- ログイン情報をヘッダーに変更
- crud

  - 事前設定

    - rest supabase 拡張機能 http をオンにしておく // 今回はなし　 supabase.js でやる
    - table を作成

    ```sql
    CREATE TABLE todos (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      is_done boolean DEFAULT false,
      user_id uuid REFERENCES auth.users(id),
      created_at timestamp DEFAULT now()
    );
    ```
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

    - ER 図

    - crud 実装
      - effectでは初期データの取得ができてもその後ができない
      - useSWRを使用　コンポーネントでmutate() を呼び出し
      - .eqは重ねがけできる　.eq("user_id", userId).eq("is_done", false)
      - update, delete はほぼ同じ
      - handler内でmutate() を呼び出す
        - データの更新が反映される
      - update,deleteをしたらtoastでお知らせ
      - editingはstateで管理 本番ではモーダルにする
      - 本番では todoitemをcardにする
      - orderで降順にする
      - スプレッド構文を使おう！
      - 編集ボタンを押したら編集モードになる
      - 編集モードではinputに変更する
      - 確定ボタンを押したら編集モードを解除する
      - 編集モードではinputに変更する
      - shadcnの実装

    - type todo 作成
    - 行レベルセキュリティの設計



    - form 作成

    - zod バリデーション作成

    - SWR 作成
