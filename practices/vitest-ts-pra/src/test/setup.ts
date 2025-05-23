/**
 * テスト環境のセットアップファイル
 * 
 * @jest-dom の拡張マッチャーを追加し、DOM要素のテストを容易にする
 * 例: toBeInTheDocument(), toHaveTextContent() などのマッチャーが使用可能になる
 */
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

/**
 * 各テスト後に実行されるクリーンアップ処理
 * 
 * テスト間の状態の分離を保証し、テストの独立性を維持する
 * メモリリークを防ぎ、テストの信頼性を向上させる
 */
afterEach(() => {
  cleanup()
}) 