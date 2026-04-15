## Context

各 `actions.ts` は「FormData から string 取得 → 型チェック → usecase 呼び出し → `result.ok` で `revalidatePath`」という同一パターンを繰り返している。また各 usecase は呼び出し側と入力の型契約を持たず、action 側での引数の組み立てが暗黙的になっている。

現状の重複パターン（3ファイル共通）:
```typescript
const x = formData.get("key")
if (typeof x !== "string") return { ok: false, error: "..." }
const result = await someUsecase.method(x)
if (result.ok) revalidatePath("/path")
return result
```

## Goals / Non-Goals

**Goals:**
- `FormData` からの string 型チェックを `Validation` クラスに集約し action 層の記述量を削減する
- 各 usecase の mutation 操作に対する `Input` 型を定義し、action との型契約を明示する
- `BaseUsecase<TInput, TResult>` 抽象クラスで mutation の呼び出し口を統一し、汎用 action ヘルパーで `result.ok` + `revalidatePath` パターンを共通化する

**Non-Goals:**
- Read 系操作（`topics()`, `list()`, `findByTopic()`）の抽象化（mutation のみ対象）
- Repository 層・Domain 層への変更
- バリデーションライブラリ（zod 等）の導入

## Decisions

### 1. `Validation` クラスは static メソッドのみを持つ

**決定**: `Validation` をインスタンス化不要の static メソッド集として実装する。

```typescript
// src/lib/validation.ts
export class Validation {
  static string(formData: FormData, key: string): string | null {
    const value = formData.get(key)
    return typeof value === "string" ? value : null
  }
}
```

**理由**: action 層でのバリデーションはステートレスな変換操作のみ。インスタンスを生成するメリットがなく、関数のグループ化として class が適切。将来的に `number()` 等を追加するときも同じクラスに集約できる。

**不採用案**: モジュールレベルの export 関数群 → 名前空間がなく import が散漫になる。

---

### 2. `BaseUsecase<TInput, TResult>` は `execute` 1つの abstract メソッドを持つ

**決定**: 抽象クラスの mutation 操作は `execute(input: TInput): Promise<TResult>` に統一する。

```typescript
// src/usecases/BaseUsecase.ts
export abstract class BaseUsecase<TInput, TResult> {
  abstract execute(input: TInput): Promise<TResult>
}
```

**理由**: 実際の usecase はすべて「1つの mutation（add / submit）」と「1つ以上の query」の構成。CRUD 全操作を abstract で強制すると、不要な操作まで実装が必要になり YAGNI に反する。mutation 呼び出し口を `execute` に統一することで汎用 action ヘルパーが成立する。

**不採用案**: `create / read / update / delete` を個別 abstract → 使わないメソッドを持つ実装クラスが生まれる。

---

### 3. 各 usecase の mutation 入力は `XxxInput` 型として `src/types/` に定義する

**決定**: `TopicInput`, `AnswerInput`, `PredictionInput` を各型ファイルに追加する。

```typescript
// src/types/topic.ts
export type TopicInput = { title: string }

// src/types/answer.ts
export type AnswerInput = { topicId: number; answer: string }

// src/types/prediction.ts
export type PredictionInput = { topicId: number; predict: string }
```

answer / prediction の input は action 層で string として受け取り、usecase 内部で `parseFloat` する（現状維持）。action → usecase の境界では string のまま渡す。

**理由**: `src/types/` は Server Action の Request/Result 型置き場として既に確立されている。Input 型を同じ場所に置くことでアーキテクチャの一貫性を保つ。

---

### 4. 汎用 action ヘルパーは `src/lib/action.ts` に module 関数として実装する

**決定**: class を使わずシンプルな関数として実装する。

```typescript
// src/lib/action.ts
export async function executeAction<TInput, TResult extends { ok: boolean }>(
  usecase: BaseUsecase<TInput, TResult>,
  input: TInput,
  revalidatePaths: string[]
): Promise<TResult> {
  const result = await usecase.execute(input)
  if (result.ok) {
    revalidatePaths.forEach(revalidatePath)
  }
  return result
}
```

**理由**: action ヘルパー自体に状態はなく、class にする理由がない。

---

### 5. 各 usecase の既存 mutation メソッド（`add`, `submit`）を `execute` に改名する

**決定**: `ITopicUsecase.add` → `execute`, `IAnswerUsecase.submit` → `execute`, `IPredictionUsecase.submit` → `execute` に統一する。インターフェースも合わせて更新する。

**理由**: `BaseUsecase.execute` を実装するため。既存メソッド名を残す後方互換性維持は不要（CLAUDE.md の方針に従う）。

## Risks / Trade-offs

- **execute の型安全性**: `BaseUsecase<TInput, TResult>` が共変・反変を適切に扱えるか TypeScript の型チェックで確認が必要 → コンパイルエラーが出た時点で対処する
- **Read 系メソッドの interface 分離**: `execute` に統一することで `ITopicUsecase` が `BaseUsecase` と query メソッドを両方持つ構成になる。interface の肥大化は現状 2〜3 メソッドのため許容範囲
- **action ヘルパーへの移行**: 既存の action は手動で移行が必要。漏れがあってもビルドエラーにはならない → tasks で各ファイルを明示してチェックリスト化する

## Open Questions

（なし）
