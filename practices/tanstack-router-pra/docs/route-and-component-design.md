# ルーティング実装手順書
実装を行う前のこの手順書が正しいかを考えてください

## API fetch先について
JSONPlaceholderを使用してください
@JSONPlaceholder
にあります

## 必要な機能

## コンポーネント設計
### Layout
- header
  - post -> /post へ
### 表示系
Posts
- データ表示の親コンポーネント

Post
- 個別のポストを表示
- Commentsコンポーンネント
- updateButton - > true -><UpdatePost>
- deleteButton -> モーダルで確認 -> okなら DELETE(JSONPlaceholder仕様書でDELETE) handleDelete

Comennts(post/id/commentsをフェッチ)
- post/id/comments を表示
- mapを使い Commentに送る

Comment
- Commentsから送られきたpropsを表示

### form
PostForm handlePost title body userId
- chadcnをインストールして使用すること
- zodを使用しvalidationにすること
- restで実装 POST
- ここは同期処理にしてください
- 理由: form送信後 /posts に遷移させることで自分の投稿が最上位に行くようにする

userIf int.min(1)
title string.max(20).min(1)
body string.max(50).min(1)

- Formコンポーネント<Form>
- id <Input>
- title <Input>
- body <Input>


## ルーティング設計
- /posts post全表示 Postsコンポーネント
- /posts/:id 単体post表示 Postコンポーネントを使用
- /posts/:id/edit postの編集画面 PostEditコンポーネント
- /postform form PostFormコンポーネント

## 手順書
rootrouteの作成