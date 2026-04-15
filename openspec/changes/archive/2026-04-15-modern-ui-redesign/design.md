## Context

現在のUIコンポーネント群はスタイルが一切なく、素のHTML要素として表示されている。Tailwind CSS v4が `globals.css` に `@import "tailwindcss"` で導入済みだが未活用。外部UIライブラリ（shadcn/ui, Radix等）は未導入。コンポーネント構成はAtomic Design 3層（atoms/molecules/organisms）で整理されており、今回のスタイリングもその層構造に沿って行う。

## Goals / Non-Goals

**Goals:**
- 外部ライブラリを追加せず、Tailwind CSS v4のユーティリティクラスのみでスタイリングを完結させる
- デザイントークン（カラー・タイポグラフィ）をTailwind v4の `@theme` ブロックとして `globals.css` に定義し、一貫性を保つ
- Buttonにバリアント（`primary` / `ghost`）を追加し、文脈に応じた見た目の切り替えを可能にする
- すべてのフォーム系コンポーネントでフォーカスリングを明示的にスタイリングし、アクセシビリティを確保する
- モバイルファーストのレスポンシブデザインを採用する

**Non-Goals:**
- ダークモード対応（今回のスコープ外）
- アニメーション・トランジションの追加（今回のスコープ外）
- 既存のprops・インターフェースの破壊的変更（Buttonのvariantはオプショナルとして追加）

## Decisions

### 1. デザイントークンの定義方法: Tailwind v4 `@theme` ブロック

**決定**: `globals.css` の `@theme` ブロックにカラーパレットとフォントサイズを定義する。

**理由**: Tailwind CSS v4では `@theme` でカスタムCSS変数を定義するとTailwindのユーティリティクラスとして直接使用できる（例: `bg-primary`）。ハードコードされた色文字列をコンポーネントに散在させず、一元管理できる。

**カラーパレット（案）**:
- `--color-primary`: `#3b82f6`（blue-500）— CTA・リンク
- `--color-primary-hover`: `#2563eb`（blue-600）— ホバー時
- `--color-surface`: `#ffffff`— カード・パネル背景
- `--color-muted`: `#6b7280`（gray-500）— ヘルパーテキスト
- `--color-border`: `#e5e7eb`（gray-200）— ボーダー
- `--color-destructive`: `#ef4444`（red-500）— エラー・削除系

**却下した代替案**: CSS custom propertiesを `:root` に手書きする → Tailwindのユーティリティクラスとして使えないため不採用。

---

### 2. Buttonのバリアント実装: `variant` propをオプションで追加

**決定**: `Button` に `variant?: "primary" | "ghost"` propを追加し、デフォルトを `"primary"` とする。

**理由**: 既存の呼び出し箇所（`TopicForm`, `AnswerForm`, `PredictionForm`）はすべてデフォルトで動作し、破壊的変更なし。organisms側でキャンセル等に `ghost` を使える。

**スタイル**:
- `primary`: `bg-primary text-white hover:bg-primary-hover rounded-md px-4 py-2 font-medium`
- `ghost`: `text-primary hover:underline px-4 py-2`

---

### 3. Input・FormFieldのスタイリング方針

**決定**: `Input` にボーダー・パディング・フォーカスリングを適用。`FormField` でラベルとInputの縦積みレイアウトを整える。

**スタイル（Input）**: `border border-border rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-primary`

---

### 4. Organisms のレイアウト方針: カード + 中央寄せコンテナ

**決定**: 各organismsをカード（白背景・角丸・シャドウ）で囲み、ページレベルではmax-widthコンテナで中央寄せする。

**理由**: シンプルかつモダンに見えるコンテナ+カードパターンを採用。新たなコンポーネントを追加せず、既存のdiv構造にクラスを付与するだけで実現できる。

---

### 5. Headingのスタイリング: `level` に応じたサイズマッピング

**決定**: `Heading` はlevelごとにフォントサイズ・ウェイトをマッピングする。

- `level=1`: `text-2xl font-bold`
- `level=2`: `text-xl font-semibold`
- `level=3`: `text-lg font-medium`

## Risks / Trade-offs

- **[Risk] organisms のスタイリングがビジュアル要件に縛られてしまう** → organisms はドメイン知識を持つ層なので、レイアウトの変更は許容範囲内とする。レイアウトロジックをPageに押し上げる必要が生じた場合は別途対応する。
- **[Risk] Tailwind v4の `@theme` ブロック構文が一部環境で正しく解釈されない** → 公式v4ドキュメントの構文に従い、PostCSS経由の処理で動作確認する。

## Open Questions

- Anchor コンポーネントに `external` (新規タブ) などのバリアントが今後必要になるか → 今回はスコープ外とする（YAGNI）
