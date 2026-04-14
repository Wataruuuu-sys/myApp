## 1. Prisma スキーマ

- [x] 1.1 `prisma/schema.prisma` に `PredictionType` enum（`number`）を追加する
- [x] 1.2 `prisma/schema.prisma` に `Prediction` モデル（id, fk_topic_id, prediction_type, created_at）を追加し、Topic との relation を定義する
- [x] 1.3 `prisma/schema.prisma` に `PredictionNumber` モデル（id, fk_prediction_id, predict, created_at）を追加し、Prediction との relation を定義する
- [x] 1.4 `bunx prisma db push` を実行してスキーマを DB に反映する
- [x] 1.5 `bunx prisma generate` を実行して Prisma Client を再生成する

## 2. Domain エンティティ

- [x] 2.1 `src/domain/Prediction.ts` を作成し、`Prediction` クラス（id, topicId, predictionType, createdAt）と `from(model)` を実装する

## 3. Repository

- [x] 3.1 `src/repositories/IRepository/IPredictionRepository.ts` を作成し、`submit` と `list` のインターフェースを定義する
- [x] 3.2 `src/repositories/PredictionRepository.ts` を作成し、`submit`（Prediction + PredictionNumber をトランザクションで作成）と `list` を実装する

## 4. Usecase

- [x] 4.1 `src/usecases/IUsecase/IPredictionUsecase.ts` を作成し、`submit` と `list` のインターフェースを定義する
- [x] 4.2 `src/types/prediction.ts` を作成し、`SubmitPredictionResult` 型を定義する
- [x] 4.3 `src/usecases/PredictionUsecase.ts` を作成し、以下を実装する
  - `submit`: 数値バリデーション → Topic ステータス確認（open のみ許可）→ repository.submit
  - `list`: repository.list の結果を返す

## 5. DI 配線

- [x] 5.1 `src/lib/container.ts` に `PredictionRepository` と `PredictionUsecase` を追加し、`predictionUsecase` をエクスポートする

## 6. Server Action

- [x] 6.1 `src/app/topic/[id]/predictions/actions.ts` を作成し、`submitPrediction` と `predictions` の Server Action を実装する

## 7. テスト

- [x] 7.1 `PredictionUsecase` のユニットテストを作成する（正常投稿・数値バリデーション・open 以外の拒否・存在しない Topic の拒否）
- [x] 7.2 `PredictionRepository` のユニットテストを作成する（submit / list のクエリ引数・戻り値）
