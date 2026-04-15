## ADDED Requirements

### Requirement: BaseUsecase は mutation 操作の型安全な呼び出し口を提供する
`BaseUsecase<TInput, TResult>` 抽象クラスは `execute(input: TInput): Promise<TResult>` を abstract メソッドとして持つ SHALL。各 usecase はこれを継承して具体的な mutation を実装する。

#### Scenario: execute の実装強制
- **WHEN** `BaseUsecase` を継承したクラスが `execute` を実装しない
- **THEN** TypeScript コンパイルエラーが発生する

#### Scenario: 型パラメータが action から usecase まで伝播する
- **WHEN** `TopicUsecase extends BaseUsecase<TopicInput, AddTopicResult>` と宣言する
- **THEN** `execute({ title: "..." })` の呼び出しが型チェックを通過する

### Requirement: 各 usecase の mutation 入力は Input 型として定義する
`TopicInput`, `AnswerInput`, `PredictionInput` を `src/types/` に定義し、`execute` の引数型として使用する SHALL。

#### Scenario: TopicInput による題名の型指定
- **WHEN** action が `{ title: string }` を `topicUsecase.execute` に渡す
- **THEN** TypeScript がその型を `TopicInput` として検証する

#### Scenario: AnswerInput による回答の型指定
- **WHEN** action が `{ topicId: number; answer: string }` を `answerUsecase.execute` に渡す
- **THEN** TypeScript がその型を `AnswerInput` として検証する

#### Scenario: PredictionInput による予測の型指定
- **WHEN** action が `{ topicId: number; predict: string }` を `predictionUsecase.execute` に渡す
- **THEN** TypeScript がその型を `PredictionInput` として検証する

### Requirement: executeAction ヘルパーは mutation 呼び出しと revalidatePath を共通化する
`executeAction<TInput, TResult extends { ok: boolean }>(usecase, input, paths)` は usecase の `execute` を呼び出し、`result.ok` が true のとき指定パスを revalidate する SHALL。

#### Scenario: 成功時の revalidatePath 実行
- **WHEN** `usecase.execute(input)` が `{ ok: true }` を返す
- **THEN** `revalidatePath` が `paths` 内の各パスに対して呼び出される

#### Scenario: 失敗時の revalidatePath スキップ
- **WHEN** `usecase.execute(input)` が `{ ok: false, error: "..." }` を返す
- **THEN** `revalidatePath` は呼び出されない

#### Scenario: result がそのまま返却される
- **WHEN** `executeAction` が完了する
- **THEN** `usecase.execute(input)` の返り値をそのまま呼び出し元に返す
