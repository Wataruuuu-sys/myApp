## Context

既存の Answer 機能（Topic に正解を登録する）と同様のパターンで、Prediction 機能（Topic に対してユーザーが事前に予想を投稿する）を追加する。

現在の構造：
- `Topic` は `open` / `closed` / `answered` のステータスを持つ
- `Answer` / `AnswerNumber` が正解エンティティとして既に存在する
- クリーンアーキテクチャ（domain → usecase → repository → app）に従い各層が分離されている

## Goals / Non-Goals

**Goals:**
- Topic に対して予想（Prediction）を投稿できる
- 予想の種類を `prediction_type` enum で拡張可能にする（初期値: `number`）
- 予想の数値を `PredictionNumber` で保持する
- 一覧取得で Topic に紐づく全予想を返す

**Non-Goals:**
- 予想の編集・削除
- ユーザー認証（予想の投稿者管理）
- Bet（賭け）エンティティとの連携（将来拡張として保留）
- 予想の集計・統計

## Decisions

### 1. Answer / AnswerNumber パターンを踏襲する

**決定:** Prediction / PredictionNumber の 2 テーブル構成とし、Answer の設計をそのまま踏襲する。

**理由:** 既存コードとの一貫性が高く、レビューコストが低い。型の種類を `prediction_type` enum で表現することで、将来の型追加（例: `text`, `choice`）に対応できる。

**代替案:** 単一テーブルに `predict_value` カラムを持たせる → 型ごとのバリデーションが困難になるため却下。

### 2. 予想可能な Topic ステータスを `open` のみとする

**決定:** `topic.status === "open"` の場合のみ予想を受け付ける。

**理由:** `closed` はトピックが締め切られた状態、`answered` は正解が確定した状態であり、いずれも予想を受け付けるべきでない。Answer は `answered` 以外を条件としているが、Prediction は `open` に限定することで意図を明確にする。

**代替案:** `closed` でも予想を許可する → 仕様的に意味がないため却下。

### 3. PredictionNumber の FK は fk_prediction_id とする

**決定:** `PredictionNumber.fk_prediction_id → Prediction.id` の関係とする（AnswerNumber と同様）。

**理由:** DB設計図の矢印（Prediction → Prediction_number）と一致し、Prediction が親エンティティとなる構造が自然。

### 4. fk_bet_id は今回スコープ外

**決定:** DB設計に `fk_bet_id` カラムが含まれているが、Bet エンティティが存在しないため今回は追加しない。

**理由:** YAGNI。将来 Bet 機能を追加する際に別 change として対応する。

## Risks / Trade-offs

- [同一 Topic に複数の Prediction を許可] → 現仕様では制限なし。ユーザーが何度でも予想できる。将来的に制限が必要な場合は usecase に重複チェックを追加する。
- [Answer との類似コード] → Prediction / Answer は構造が酷似するが、責務が異なる（予想 vs 正解）ため共通化しない。DRY より明示性を優先。
