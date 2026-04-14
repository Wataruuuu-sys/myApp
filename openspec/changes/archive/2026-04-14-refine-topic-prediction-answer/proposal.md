## Why

予想・回答機能の仕様が「1件のみ登録可能・編集可否のルール」を定義しておらず、実装の意図と乖離している。またTopic詳細ページにおける予想・回答の表示ロジックが仕様化されていないため、実装の根拠がない状態になっている。

## What Changes

- **予想機能**: 1 Topic につき予想は 1 件に制限し、topic が `open` の場合のみ編集可能にする（**BREAKING**: 複数予想登録不可・upsert挙動へ変更）
- **回答機能**: 1 Topic につき回答は 1 件に制限し、topic が `open` または `closed` の場合は編集可能にする（**BREAKING**: `already_answered` エラーをなくし upsert 挙動に変更）
- **Topic詳細機能**: Topic詳細ページに関連する予想の表示、空状態の導線、ステータス別の表示制御を仕様化する

## Capabilities

### New Capabilities

- `topic-detail`: Topic詳細ページの表示仕様（予想表示・空状態・回答表示・ステータス別UI制御）

### Modified Capabilities

- `topic-prediction`: 1Topic1予想制約と編集可否ルールの追加（upsert挙動への変更、`open` のみ編集可能）
- `topic-answer`: 1Topic1回答制約と編集可否ルールの追加（upsert挙動への変更、`open` / `closed` で編集可能）

## Impact

- `src/app/topic/[id]/predictions/` — upsert 対応（既存予想の上書き）
- `src/app/topic/[id]/answer/` — upsert 対応（既存回答の上書き）
- `src/app/topic/[id]/` — Topic詳細ページ（新規作成または既存ページの拡張）
- `src/usecases/` — PredictionUsecase・AnswerUsecase の upsert ロジック変更
- `src/repositories/` — PredictionRepository・AnswerRepository の upsert 対応
