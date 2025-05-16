## 💡アプリ名：書籍管理ダッシュボード

### 🎯目的
ユーザーが自分の読書記録を一覧・登録・編集・削除できるWebアプリ。TypeScriptとZodで型安全に、SWRでデータ取得、shadcn/uiでUI構築、React Router v7でページ遷移を行う。

### 📝機能要件

#### 🖼 画面一覧

- **書籍一覧ページ /books**
  - 書籍のタイトル、著者、ステータス（未読・読書中・読了）を一覧表示
  - SWRでAPIから取得
  - shadcnのTableコンポーネントで一覧化
  - 各行に編集・削除ボタン

- **書籍登録ページ /books/new**
  - タイトル（text）、著者（text）、ステータス（select）の入力欄
  - Zodでバリデーション
  - shadcnのInput, Select, Buttonを使用
  - 送信後、一覧ページにリダイレクト

- **書籍編集ページ /books/:id/edit**
  - 書籍の内容を編集できる
  - URLパラメータからIDを取得（React RouterのuseParams）
  - 初期値をSWRで取得してフォームに反映

- **404ページ**
  - 存在しないルートにアクセスされた場合の表示

### 📦非機能要件
- React Router v7でページ遷移を管理
- Zodで全フォーム入力に型・バリデーションを適用
- UIはshadcn/uiコンポーネントで統一
- データ取得・キャッシュ管理にSWRを使用
- JSON Server などの簡易REST APIで実装しても良い

### ✅この課題で学べること

| 技術         | 学べること                          |
|--------------|-----------------------------------|
| Router v7    | useParams, useNavigate, ルーティング設計 |
| SWR          | useSWR, mutate, APIフェッチ         |
| Zod          | スキーマバリデーション、フォーム検証   |
| shadcn/ui    | UIパーツの活用、UIデザインの統一     |

### jsonserver