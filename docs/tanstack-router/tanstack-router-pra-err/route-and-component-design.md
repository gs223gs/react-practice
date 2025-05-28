# ルーティング実装手順書
実装を行う前のこの手順書が正しいかを考えてください

## 技術スタック
react v19
tanstack router v4
tanstack query v5
tailwindcss
vitest
shadcn/ui
zod
react-hook-form

## 実装ルールについて
- コンポーネントはシンプルにする
- コンポーネントは再利用性を高める
- コンポーネントはテストしやすいようにする
- コンポーネントはデータフェッチはloaderで行う
- コンポーネントはデータフェッチはtanstack queryを使用する
- コンポーネントはデータフェッチはuseQueryを使用する
- コンポーネントはデータフェッチはuseQueryの結果をuseLoaderDataで取得する
- 基本的にはshadcn/uiを使用する
- 単一原則を守る


## テストについて
- テストはvitestを使用する
- テストはユニットテストを行う
- APIフェッチのフックのテストはモックを使用する
  - そのために，APIフェッチのフックは依存注入を使用する

## カスタムフック

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
- updateButton - > true -><PostForm defaultValues={post} mode={"edit"} onSubmit={handleSubmit} />
  - URLを/posts/:id/editにする
- deleteButton -> モーダルで確認 -> okなら DELETE(JSONPlaceholder仕様書でDELETE) handleDelete

Comennts(post/id/commentsをフェッチ)
- post/id/comments を表示
- mapを使い Commentに送る

Comment
- Commentsから送られきたpropsを表示

### form
PostForm handlePost title body userId
- props はdefaultValues, mode, onSubmit
  - onSubmitはhandlePost, handleUpdateの二つのどちらかを渡す
    - handlePostはPOST(JSONPlaceholder仕様書でPOST)
    - handleUpdateはPUT(JSONPlaceholder仕様書でPUT)
  - defaultValuesはpostのデータを渡す
    - updateの場合はpostのデータを渡す
    - createの場合は空のデータを渡す
  - modeは"edit"か"create"を渡す
  - modeによってupdateかcreateかを決める
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
- /posts/create form PostFormコンポーネント

## loaderについて
- データフェッチはtanstack queryを使用する
- データフェッチはloaderで行う
- データフェッチはuseQueryを使用する
- データフェッチはuseQueryの結果をuseLoaderDataで取得する
- データフェッチはuseQueryの結果をuseLoaderDataで取得する
## 手順書
componentの作成
エンドポイントはシングルトンで複数コンポーネントから一つのファイルを読み込むようにする
root.tsxの作成
- headerをLayoutとして作成
- outletでform と postsを表示

## 今後の課題
- 認証でのルート保護
- 認証前のアクセスでリダイレクト