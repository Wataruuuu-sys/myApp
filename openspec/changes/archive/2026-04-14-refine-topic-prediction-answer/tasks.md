## 1. Prediction upsert対応

- [x] 1.1 `IPredictionRepository` の `submit` を upsert 対応シグネチャに変更（既存の topic に対して Prediction が存在する場合は PredictionNumber を更新）
- [x] 1.2 `PredictionRepository.submit` を upsert 挙動に変更（`findFirst` で既存 Prediction を確認し、存在すれば `PredictionNumber.predict` を update、なければ Prediction + PredictionNumber を新規作成）
- [x] 1.3 `PredictionUsecase.submit` の変更不要を確認（Usecase のロジックはそのまま、Repository に委譲）

## 2. Answer upsert対応

- [x] 2.1 `IAnswerRepository` の `submit` を upsert 対応シグネチャに変更
- [x] 2.2 `AnswerRepository.submit` を upsert 挙動に変更（`findFirst` で既存 Answer を確認し、存在すれば `AnswerNumber.answer` を update、なければ Answer + AnswerNumber を新規作成 + topic status を `answered` に更新）
- [x] 2.3 `AnswerUsecase.submit` の条件分岐を確認（`topic.status === "answered"` のガードはそのまま維持）

## 3. Topic詳細ページ用データ取得の追加

- [x] 3.1 `types/answer.ts` に `AnswerWithValue` 型を追加（id, answer: number）
- [x] 3.2 `IAnswerRepository` に `findByTopic(topicId: number)` を追加（Answer + AnswerNumber を結合して返す）
- [x] 3.3 `AnswerRepository.findByTopic` を実装
- [x] 3.4 `IAnswerUsecase` に `findByTopic(topicId: number): Promise<AnswerWithValue | null>` を追加
- [x] 3.5 `AnswerUsecase.findByTopic` を実装

## 4. Topic詳細ページの実装

- [x] 4.1 `src/app/topic/[id]/page.tsx` を新設
- [x] 4.2 TopicUsecase で topic を取得し notFound ガードを実装
- [x] 4.3 `PredictionUsecase.list` で予想を取得し、先頭1件を詳細表示に使用
- [x] 4.4 予想がない場合の表示を実装（「予想がない」文言 + `open` ステータスのみ `/topic/[id]/predictions` へのリンクを表示）
- [x] 4.5 `AnswerUsecase.findByTopic` で回答を取得し、`answered` ステータスのときのみ回答の数値を表示
