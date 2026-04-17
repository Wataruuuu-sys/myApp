## Context

現在 Prediction は `PredictionNumber` を通じて予想値を管理している。Bet は Prediction とは独立した概念で、「予想に対していくら賭けるか」を表す。既存の予想投稿フローとは別に Bet を作成・更新できる必要がある。

既存パターン: `domain → IRepository/IUsecase → Repository/Usecase → container → Server Action → UI`

## Goals / Non-Goals

**Goals:**
- Prediction に紐づく Bet を作成・更新できる
- Bet.value は数値のみ許容する
- 予想とは独立して Bet を編集できる（別 Server Action）
- クリーンアーキテクチャの既存パターンに沿って実装する

**Non-Goals:**
- Bet の削除機能
- 複数の Bet を 1 つの Prediction に紐付けること
- Bet の履歴管理

## Decisions

### 1. Bet モデルのスキーマ設計

**決定**: Bet テーブルに `fk_prediction_id`（unique）を持たせ、Prediction 側に `fk_bet_id`（nullable）を持たせる 1:1 双方向関係とする。

- Bet: `id`（PK）, `fk_prediction_id`（Int, unique）, `value`（Float）
- Prediction: `fk_bet_id`（Int?, nullable）追加

**理由**: 図示の通り。Prediction → Bet の参照を持つことで Prediction 取得時に Bet を JOIN しやすい。Bet → Prediction の参照は Bet の独立編集時に Prediction を特定するため必要。

**代替案**: Bet のみに `fk_prediction_id` を持ち、Prediction には FK を持たない設計。シンプルだが、Prediction 一覧取得時に Bet を効率よく JOIN できない。

### 2. Bet の作成・更新を同一 Server Action で扱う

**決定**: Bet が未作成なら INSERT、既存なら UPDATE（upsert）とし、1 つの Server Action `saveBet` で統一する。

**理由**: UIからは「Betを保存する」操作であり、作成・更新を意識させる必要がない。既存の `predictionRepository.submit` の upsert パターンと統一感がある。

**代替案**: 作成と更新を別 Server Action に分ける。不要な複雑さになる。

### 3. Prediction ドメインには Bet 情報を含めない

**決定**: `Prediction` ドメインクラスは変更しない。Bet 情報は `BetUsecase` 経由でのみ取得・更新する。

**理由**: 依存方向を保つ。Bet は Prediction の関心事ではなく独立したユースケース。

**代替案**: `PredictionWithValue` に `bet` フィールドを追加する。Prediction が Bet に依存することになり、クリーンアーキテクチャ違反。

### 4. UI は予想ページの既存フォームに Bet セクションを追加

**決定**: 予想入力フォームとは別の独立したフォームとして Bet 入力を配置する。`<form>` を分けることで、Bet の保存が予想の再投稿を引き起こさない。

## Risks / Trade-offs

- **循環参照リスク** → Prediction.fk_bet_id を nullable にし、Bet 作成後に Prediction を更新する 2 ステップにすることで回避。Prisma の `@relation` 設定で正しく定義する。
- **DB 整合性** → Bet 作成と Prediction 更新の間に障害が起きた場合、Prediction.fk_bet_id が null のまま Bet レコードが孤立する可能性がある。Bet は `fk_prediction_id` で検索可能なため、実害は限定的。将来的にトランザクションで包む対応も可能。
