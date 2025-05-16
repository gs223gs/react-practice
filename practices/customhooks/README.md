# カスタムフック練習問題（レベル 1 〜 10）

**想定環境**: React 18 以上 / JavaScript または TypeScript  
**共通ルール**: すべて **1 ファイル**のカスタムフックとして実装し、簡単なデモコンポーネントで動作確認する。

| Lv | フック名 | 目的 |
|----|----------|------|
| 1  | `useToggle`        | 真偽値をトグルする |
| 2  | `useCounter`       | 任意ステップで加減算 |
| 3  | `useInput`         | テキスト入力の値とリセット |
| 4  | `useInterval`      | コールバックを一定間隔で実行 |
| 5  | `usePrevious`      | 直前の値を保持 |
| 6  | `useDebounce`      | 値のデバウンス |
| 7  | `useOnClickOutside`| 要素外クリック検知 |
| 8  | `useFetch`         | GET リクエストでデータ取得 |
| 9  | `useLocalStorage`  | 状態を localStorage と同期 |
| 10 | `useFormErrors`    | 入力バリデーション結果を返す |

---

## 各レベルの設計書テンプレート
- **責務**  
- **引数**  
- **戻り値**  
- **内部状態**  
- **副作用**  
- **クリーンアップ**  

---

### Lv 1 : `useToggle`
| 項目 | 内容 |
|------|------|
| **責務** | `true / false` を切り替える |
| **引数** | `initial?: boolean`（既定 `false`） |
| **戻り値** | `[value, toggle]` |
| **内部状態** | `value` (`useState`) |
| **副作用** | なし |
| **クリーンアップ** | 不要 |
| **学ぶこと** | `useState` と **配列戻り値** |

---

### Lv 2 : `useCounter`
| 項目 | 内容 |
|------|------|
| **責務** | `+step / -step` で数値を更新 |
| **引数** | `initial = 0`, `step = 1` |
| **戻り値** | `{count, inc, dec, reset}` |
| **内部状態** | `count` (`useState`) |
| **副作用** | なし |
| **クリーンアップ** | 不要 |
| **学ぶこと** | ステート更新関数の **コールバック形式** |

---

### Lv 3 : `useInput`
| 項目 | 内容 |
|------|------|
| **責務** | 入力値管理とリセット |
| **引数** | `initial = ''` |
| **戻り値** | `{value, onChange, reset}` |
| **内部状態** | `value` |
| **副作用** | なし |
| **クリーンアップ** | 不要 |
| **学ぶこと** | `event.target.value` ハンドリング |

---

### Lv 4 : `useInterval`
| 項目 | 内容 |
|------|------|
| **責務** | 一定間隔でコールバック実行 |
| **引数** | `callback`, `delay(ms)` |
| **戻り値** | `start`, `stop`, `isRunning` |
| **内部状態** | `timerId` (`useRef`) |
| **副作用** | `setInterval` |
| **クリーンアップ** | `clearInterval` |
| **学ぶこと** | `useEffect` と **クリーンアップ関数** |

---

### Lv 5 : `usePrevious`
| 項目 | 内容 |
|------|------|
| **責務** | 直前の値を参照 |
| **引数** | `value` |
| **戻り値** | `prev` |
| **内部状態** | `ref.current` |
| **副作用** | `useEffect` で代入 |
| **クリーンアップ** | 不要 |
| **学ぶこと** | `useRef` をステート代替で使う |

---

### Lv 6 : `useDebounce`
| 項目 | 内容 |
|------|------|
| **責務** | 値を指定時間遅延して返す |
| **引数** | `value`, `delay` |
| **戻り値** | `debouncedValue` |
| **内部状態** | `debouncedValue` |
| **副作用** | `setTimeout` → `delay` 後に更新 |
| **クリーンアップ** | `clearTimeout` |
| **学ぶこと** | 依存配列と **デバウンスパターン** |

---

### Lv 7 : `useOnClickOutside`
| 項目 | 内容 |
|------|------|
| **責務** | 対象要素外クリック検知 |
| **引数** | `ref`, `handler` |
| **戻り値** | なし |
| **内部状態** | なし |
| **副作用** | `mousedown` / `touchstart` 監視 |
| **クリーンアップ** | `removeEventListener` |
| **学ぶこと** | DOM イベント購読と **Ref 取り扱い** |

---

### Lv 8 : `useFetch`
| 項目 | 内容 |
|------|------|
| **責務** | URL からデータ取得 |
| **引数** | `url` |
| **戻り値** | `{data, loading, error}` |
| **内部状態** | 3 変数 |
| **副作用** | `fetch` + `AbortController` |
| **クリーンアップ** | `abort()` |
| **学ぶこと** | 非同期処理と **ローディング状態管理** |

---

### Lv 9 : `useLocalStorage`
| 項目 | 内容 |
|------|------|
| **責務** | state を localStorage と双方向同期 |
| **引数** | `key`, `initial` |
| **戻り値** | `[value, setValue]` |
| **内部状態** | `value` |
| **副作用** | `localStorage.getItem / setItem` |
| **クリーンアップ** | 不要 |
| **学ぶこと** | 初期化関数形式 `useState` と永続化 |

---

### Lv 10 : `useFormErrors`
| 項目 | 内容 |
|------|------|
| **責務** | 複数フィールドの検証結果を返す |
| **引数** | `values`, `validators` （`(value) ⇒ string ⟋ null`） |
| **戻り値** | `errors` オブジェクト |
| **内部状態** | `errors` |
| **副作用** | `useEffect` で値が変わる度に再評価 |
| **クリーンアップ** | 不要 |
| **学ぶこと** | オブジェクトステートと **ユニットテスト**（Jest / RTL） |

---

## 解けない場合に学ぶべきこと

| レベル帯 | 重点トピック | 推奨教材 |
|----------|-------------|----------|
| 1–3 | `useState`・基本 JSX・イベントハンドリング | React 公式 **「State & Lifecycle」** |
| 4–6 | `useEffect`・依存配列・クリーンアップ・`useRef` | React 公式 **「Hooks API Reference」** |
| 7   | DOM イベント・ポータル・Ref 透過 | MDN **DOM Events**, React **「Refs & the DOM」** |
| 8   | Promise / fetch・AbortController・三態管理 | MDN **Fetch**, Kent C. Dodds *“React Queryless Fetch”* |
| 9   | Web Storage API・初期化関数・シリアライズ | MDN **Web Storage**, *TypeScript Utility Types* |
| 10  | バリデーションパターン・オブジェクト操作・テスト | Testing Library Docs, *Effective TypeScript* Ch.6 |

まずは **Lv 1** から実装し、小さく動かして **フィードバック→リファクタ** を繰り返すと理解が深まります。  
疑問があればいつでも聞いてください！
