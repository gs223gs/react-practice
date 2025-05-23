/**
 * テスト用のカスタムレンダリング関数
 * 
 * @testing-library/react の render 関数を拡張し、
 * テスト環境に適した設定を提供する
 */
import { render as rtlRender } from '@testing-library/react'
import type { ReactElement } from 'react'

/**
 * カスタムレンダリング関数
 * 
 * @param ui - レンダリングするReact要素
 * @param options - レンダリングオプション
 * @returns レンダリング結果とユーティリティ関数を含むオブジェクト
 * 
 * デフォルトのラッパーを設定し、テストの一貫性を保証する
 */
function render(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

// @testing-library/react の全エクスポートを再エクスポート
export * from '@testing-library/react'
// カスタムレンダリング関数をエクスポート
export { render } 