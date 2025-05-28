# shadcn/uiインストールエラー対応

## エラーの概要
```
npx shadcn@latest add button
✔ You need to create a components.json file to add components. Proceed? … yes

We could not detect a supported framework at /usr/src/app.
Visit https://ui.shadcn.com/docs/installation/manual to manually configure your project.
Once configured, you can use the cli to add components.
```

## パッケージの非推奨警告
```
The 'shadcn-ui' package is deprecated. Please use the 'shadcn' package instead:

  npx shadcn@latest add button

For more information, visit: https://ui.shadcn.com/docs/cli
```

## 根本原因
1. **フレームワークの検出失敗**
   - shadcn/uiがプロジェクトのフレームワーク（Vite）を正しく検出できていない
   - これは`components.json`の設定が不完全なため

2. **設定ファイルの不足**
   - `components.json`の`tailwind.config`が空
   - 必要な依存関係が不足

3. **非推奨パッケージの使用**
   - `shadcn-ui`パッケージが非推奨となっている
   - 新しい`shadcn`パッケージへの移行が必要

## 対処療法
1. **必要なパッケージのインストール**
   ```bash
   npm install @radix-ui/react-slot @radix-ui/react-alert-dialog @radix-ui/react-label @radix-ui/react-form
   ```

2. **コンポーネントの追加（正しいコマンド）**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   npx shadcn@latest add alert-dialog
   npx shadcn@latest add form
   npx shadcn@latest add input
   npx shadcn@latest add textarea
   ```

## 原因療法
1. **`components.json`の修正**
   ```json
   {
     "tailwind": {
       "config": "tailwind.config.js",  // 空から設定ファイルのパスに変更
       "css": "src/styles/globals.css",
       "baseColor": "neutral",
       "cssVariables": true,
       "prefix": ""
     }
   }
   ```

2. **`tailwind.config.js`の作成**
   - 必要な設定を追加
   - カラーテーマの設定
   - アニメーションの設定
   - コンテンツパスの設定

## 対策の理由
1. **`components.json`の修正**
   - shadcn/uiがTailwindの設定を見つけられるようにするため
   - フレームワークの検出に必要な情報を提供

2. **依存関係の追加**
   - Radix UIのコンポーネントはshadcn/uiの基盤
   - アクセシビリティと機能性を提供

3. **Tailwind設定の追加**
   - テーマの一貫性を保つため
   - カスタムスタイルの適用に必要

4. **パッケージの更新**
   - 非推奨パッケージの使用を避けるため
   - 最新の機能と修正を利用するため

## 確認ポイント
1. **設定ファイルの存在**
   - `components.json`
   - `tailwind.config.js`
   - `src/styles/globals.css`

2. **依存関係**
   - `package.json`に必要なパッケージが含まれているか
   - バージョンの互換性

3. **パス設定**
   - `tsconfig.json`のパスエイリアス
   - コンポーネントのインポートパス

4. **パッケージの使用**
   - `shadcn-ui`ではなく`shadcn`を使用しているか
   - 最新のCLIコマンドを使用しているか

## 予防策
1. **新規プロジェクト作成時**
   - 最初に`components.json`を正しく設定
   - 必要な依存関係を事前にインストール
   - 最新の`shadcn`パッケージを使用

2. **既存プロジェクトへの追加時**
   - 設定ファイルの確認
   - 依存関係の確認
   - パスの設定確認
   - パッケージのバージョン確認

## 参考リンク
- [shadcn/ui マニュアルインストール](https://ui.shadcn.com/docs/installation/manual)
- [Tailwind CSS 設定](https://tailwindcss.com/docs/configuration)
- [Radix UI ドキュメント](https://www.radix-ui.com/docs/primitives)
- [shadcn CLI ドキュメント](https://ui.shadcn.com/docs/cli)

## 注意点
1. **バージョンの互換性**
   - React 19との互換性
   - Tailwind CSS v4との互換性
   - Viteとの互換性

2. **パスの設定**
   - `@/`エイリアスの設定
   - コンポーネントのインポートパス

3. **スタイルの適用**
   - CSS変数の設定
   - テーマの適用
   - ダークモードの設定

4. **パッケージの選択**
   - `shadcn-ui`は非推奨
   - `shadcn`パッケージを使用
   - 定期的なアップデートの確認 