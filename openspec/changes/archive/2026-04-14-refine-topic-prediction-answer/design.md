## Context

現在の実装では Prediction・Answer ともに「常に新規作成」のみで、1Topic1件制約がない。  
`AnswerUsecase.submit` はすでに `answered` の Topic に対して `already_answered` エラーを返すが、  
`answered` になる前の段階（`open`/`closed`）での上書き編集には対応していない。  
Topic詳細ページは存在せず、予想・回答の表示ロジックも実装されていない。

## Goals / Non-Goals

**Goals:**
- 1Topic1予想・1Topic1回答の制約をリポジトリ層で担保する（upsert挙動）
- 予想の編集可否を topic.status === "open" に限定する
- 回答の編集可否を topic.status が "open" または "closed" の場合に限定する
- Topic詳細ページ（`/topic/[id]`）に予想・回答の表示ロジックを追加する

**Non-Goals:**
- Topic を `closed` にする機能（別チェンジで対応）
- 予想・回答の削除
- Prismaスキーマへの unique 制約追加（アプリ層で制御する）

## Decisions

### 1. upsert はアプリ層（Repository）で制御する

Prisma の `upsert` は unique constraint がないと使用できない。  
`Prediction.fk_topic_id` と `Answer.fk_topic_id` に DB レベルの unique 制約を追加する代わりに、  
Repository 内で `findFirst` → 存在すれば `update`、なければ `create` のパターンを採用する。

**理由**: スキーマ変更とマイグレーションのリスクを避けつつ、制約をコード上で明示できる。  
1件のみという契約は Usecase 層の呼び出し構造（topic ステータスチェック付き）で保証する。

### 2. Prediction の upsert は PredictionNumber を update する

Prediction レコード自体は残し、紐づく `PredictionNumber.predict` を上書きする。  
Prediction レコードを削除して再作成する方式は履歴が失われるため採用しない。

### 3. Answer の upsert では topic.status は再設定しない

Answer を更新する場合、Topic のステータスはすでに `answered` のため再更新は不要。  
新規作成時のみ `topic.status` を `answered` に変更する。  
ただし `open` → `closed` のフローが未実装のため、現状は `open` からの初回登録時に `answered` へ遷移する。

### 4. Topic詳細ページは `/topic/[id]` に新設する

現在 `/topic/[id]/predictions` にのみページが存在する。  
`/topic/[id]` を Topic詳細ページとして新設し、予想・回答の概要表示の起点とする。  
既存の `/topic/[id]/predictions` ページはそのまま維持する。

### 5. 予想ページへの動線は topic.status === "closed" の場合は非表示

予想は `open` のみ編集可能なため、`closed` や `answered` では予想ページへ誘導する意味がない。  
ただし `open` で予想がない場合は「予想がない」文言と予想ページへのリンクを表示する。

## Risks / Trade-offs

- **競合更新リスク**: `findFirst` → `update` の間に別リクエストが insert した場合、2件になりうる。  
  → 本アプリは単一ユーザー前提のため許容する。将来的に unique 制約で解決する。

- **AnswerUsecase の既存エラー型 `already_answered` を削除**: 既存の型参照・テストが壊れる。  
  → 後方互換不要のルールに従い削除する。

## Open Questions

- Topic を `open` → `closed` にする機能は未実装。現状は `closed` での予想編集不可・回答編集可のテストが書けない。スペックには要件を記述するが、テストは `open` ケースのみカバーする。
