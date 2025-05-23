/**
 * Counterコンポーネントのテストスイート
 * 
 * このテストスイートは以下の観点をカバーしています：
 * - 初期レンダリングの検証
 * - ユーザーインタラクションの検証
 * - コールバック関数の動作確認
 * - エッジケースの処理
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/utils'
import { Counter } from './Counter'

describe('Counter', () => {
  /**
   * 初期レンダリングのテスト
   * 
   * コンポーネントが正しい初期状態でレンダリングされることを確認
   */
  describe('初期レンダリング', () => {
    it('デフォルト値で正しくレンダリングされる', () => {
      render(<Counter />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 0')
    })

    it('初期値が正しく設定される', () => {
      render(<Counter initialValue={5} />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 5')
    })
  })

  /**
   * ユーザーインタラクションのテスト
   * 
   * ボタンクリックなどのユーザーアクションに対する
   * コンポーネントの応答を検証
   */
  describe('ユーザーインタラクション', () => {
    it('インクリメントボタンが正しく動作する', () => {
      render(<Counter />)
      fireEvent.click(screen.getByTestId('increment'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1')
    })

    it('デクリメントボタンが正しく動作する', () => {
      render(<Counter initialValue={5} />)
      fireEvent.click(screen.getByTestId('decrement'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 4')
    })

    it('複数回のクリックが正しく動作する', () => {
      render(<Counter />)
      fireEvent.click(screen.getByTestId('increment'))
      fireEvent.click(screen.getByTestId('increment'))
      fireEvent.click(screen.getByTestId('increment'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 3')
    })
  })

  /**
   * コールバック関数のテスト
   * 
   * 親コンポーネントとの連携を確認
   * コールバックの有無による動作の違いを検証
   */
  describe('コールバック関数', () => {
    it('onCountChangeが正しく呼び出される', () => {
      const onCountChange = vi.fn()
      render(<Counter onCountChange={onCountChange} />)
      
      fireEvent.click(screen.getByTestId('increment'))
      expect(onCountChange).toHaveBeenCalledWith(1)
      
      fireEvent.click(screen.getByTestId('decrement'))
      expect(onCountChange).toHaveBeenCalledWith(0)
    })

    it('onCountChangeが未定義の場合でも正しく動作する', () => {
      render(<Counter />)
      fireEvent.click(screen.getByTestId('increment'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1')
    })
  })

  /**
   * エッジケースのテスト
   * 
   * 境界値や特殊なケースでの動作を確認
   * 予期しない入力に対する耐性を検証
   */
  describe('エッジケース', () => {
    it('負の値でも正しく動作する', () => {
      render(<Counter initialValue={-1} />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: -1')
      
      fireEvent.click(screen.getByTestId('decrement'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: -2')
    })

    it('大きな数値でも正しく動作する', () => {
      render(<Counter initialValue={1000} />)
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1000')
      
      fireEvent.click(screen.getByTestId('increment'))
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 1001')
    })
  })
}) 