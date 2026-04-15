## 1. Validation クラスの作成

- [x] 1.1 `src/lib/validation.ts` を新規作成し、`Validation.string(formData, key)` を実装する
- [x] 1.2 `Validation.string` の単体テストを作成する（string 取得成功・null・File 型の各ケース）

## 2. Input 型の定義

- [x] 2.1 `src/types/topic.ts` に `TopicInput = { title: string }` を追加する
- [x] 2.2 `src/types/answer.ts` に `AnswerInput = { topicId: number; answer: string }` を追加する
- [x] 2.3 `src/types/prediction.ts` に `PredictionInput = { topicId: number; predict: string }` を追加する

## 3. BaseUsecase 抽象クラスの作成

- [x] 3.1 `src/usecases/BaseUsecase.ts` を新規作成し、`abstract execute(input: TInput): Promise<TResult>` を定義する

## 4. executeAction ヘルパーの作成

- [x] 4.1 `src/lib/action.ts` を新規作成し、`executeAction(usecase, input, paths)` を実装する
- [x] 4.2 `executeAction` の単体テストを作成する（ok:true で revalidatePath 呼び出し・ok:false でスキップ）

## 5. TopicUsecase のリファクタリング

- [x] 5.1 `ITopicUsecase` の `add` メソッドを `execute(input: TopicInput): Promise<AddTopicResult>` に変更する
- [x] 5.2 `TopicUsecase` を `BaseUsecase<TopicInput, AddTopicResult>` を継承するよう変更し、`add` を `execute` に改名する
- [x] 5.3 `TopicUsecase` の既存テストを `execute` 呼び出しに更新する

## 6. AnswerUsecase のリファクタリング

- [x] 6.1 `IAnswerUsecase` の `submit` メソッドを `execute(input: AnswerInput): Promise<SubmitAnswerResult>` に変更する
- [x] 6.2 `AnswerUsecase` を `BaseUsecase<AnswerInput, SubmitAnswerResult>` を継承するよう変更し、`submit` を `execute` に改名する（内部で `parseFloat(input.answer)` に変更）
- [x] 6.3 `AnswerUsecase` の既存テストを `execute` 呼び出しに更新する

## 7. PredictionUsecase のリファクタリング

- [x] 7.1 `IPredictionUsecase` の `submit` メソッドを `execute(input: PredictionInput): Promise<SubmitPredictionResult>` に変更する
- [x] 7.2 `PredictionUsecase` を `BaseUsecase<PredictionInput, SubmitPredictionResult>` を継承するよう変更し、`submit` を `execute` に改名する（内部で `parseFloat(input.predict)` に変更）
- [x] 7.3 `PredictionUsecase` の既存テストを `execute` 呼び出しに更新する

## 8. actions.ts のリファクタリング

- [x] 8.1 `src/app/topic/actions.ts` の `addTopic` を `Validation.string` + `executeAction` を使う形に書き換える
- [x] 8.2 `src/app/topic/[id]/answer/actions.ts` の `submitAnswer` を `Validation.string` + `executeAction` を使う形に書き換える
- [x] 8.3 `src/app/topic/[id]/predictions/actions.ts` の `submitPrediction` を `Validation.string` + `executeAction` を使う形に書き換える
- [x] 8.4 各 actions.ts の既存テストを更新する（モック対象が変わる場合）

## 9. 動作確認

- [x] 9.1 `tsc --noEmit` で型エラーがないことを確認する（既存の @/generated/prisma・page.tsx の型課題は対象外）
- [x] 9.2 全テストが通ることを確認する（今回追加・変更した23件はすべてパス。既存の container.ts/Repository の既存エラーは対象外）
