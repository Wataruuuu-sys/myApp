## Why

`app/` 配下の各 `actions.ts` では、FormData からの string 型チェック・usecase 呼び出し・`result.ok` による `revalidatePath` 実行という同一パターンが繰り返されており保守コストが高い。また各 usecase は共通の入力型定義を持たず、action との型連携が弱い。

## What Changes

- **NEW** `Validation` クラスを `src/lib/` に追加し、`FormData` からの string 取得と型チェックを一元化する
- **NEW** `BaseUsecase<TInput, TResult>` 抽象クラスを `src/usecases/` に追加し、各 usecase が generic な CRUD 操作 (`execute`) を実装する形に統一する
- **BREAKING** 各 usecase (`TopicUsecase`, `AnswerUsecase`, `PredictionUsecase`) が `BaseUsecase` を継承し、個別の submit/add メソッドを `execute` に統合する
- **BREAKING** 各 `actions.ts` の手動バリデーションと result チェックを、`Validation` と共通アクションヘルパーに置き換える

## Capabilities

### New Capabilities

- `validation-utility`: `FormData` からの string 取得・空文字チェック等のバリデーションロジックを集約する `Validation` クラス
- `usecase-abstraction`: generic 型パラメータ `TInput` / `TResult` を持つ `BaseUsecase` 抽象クラスと、それを呼び出す汎用 action ヘルパー

### Modified Capabilities

（なし — 既存スペックの要件変更は発生しない。実装詳細の変更のみ）

## Impact

- `src/lib/validation.ts` (新規)
- `src/usecases/BaseUsecase.ts` (新規)
- `src/usecases/TopicUsecase.ts`, `AnswerUsecase.ts`, `PredictionUsecase.ts` (変更)
- `src/usecases/IUsecase/ITopicUsecase.ts`, `IAnswerUsecase.ts`, `IPredictionUsecase.ts` (変更)
- `src/app/topic/actions.ts`, `[id]/answer/actions.ts`, `[id]/predictions/actions.ts` (変更)
- 外部 API・DB スキーマへの影響なし
