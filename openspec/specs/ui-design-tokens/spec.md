# ui-design-tokens

## Purpose

アプリ全体で統一されたビジュアルを実現するためのデザイントークン（カラー・タイポグラフィ）を定義する。Tailwind のカスタムテーマとして利用可能とする。

## Requirements

### Requirement: デザイントークンの定義
アプリ全体で使用するカラー・タイポグラフィのデザイントークンを `globals.css` の `@theme` ブロックに定義しなければならない（SHALL）。定義されたトークンはTailwindユーティリティクラスとして利用可能となる。

#### Scenario: カラートークンが使用できる
- **WHEN** `globals.css` の `@theme` ブロックに `--color-primary` 等のカラー変数が定義されている
- **THEN** Tailwindクラス `bg-primary`, `text-primary` 等としてコンポーネント内で使用できる

#### Scenario: プライマリカラーが定義されている
- **WHEN** デザイントークンを参照する
- **THEN** 以下のカラートークンが定義されていなければならない（SHALL）: `--color-primary`（CTAカラー）、`--color-primary-hover`（ホバー時）、`--color-surface`（背景）、`--color-muted`（補助テキスト）、`--color-border`（ボーダー）、`--color-destructive`（エラー・削除系）

#### Scenario: デフォルトフォントが設定されている
- **WHEN** ページをレンダリングする
- **THEN** `body` にサンセリフ系のフォントファミリーが適用されており、文字色にデザイントークンのカラーが使われている
