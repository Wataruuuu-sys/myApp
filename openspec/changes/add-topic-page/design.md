## Context

既存のTodo機能がクリーンアーキテクチャ（domain / repository / usecase / app）で実装済み。TopicはTodoと同じ層構成を踏襲しつつ、Prismaフィールド名をsnake_caseで定義する点が異なる。

## Goals / Non-Goals

**Goals:**
- Todoと同じ層構成でTopicドメインを追加する
- Prismaモデルはsnake_caseカラム名で定義する
- 一覧ページ（`/topic`）と作成ページ（`/topic/new`）を別ページとして提供する

**Non-Goals:**
- Topicのステータス変更（open → closed → answered）
- AnswerおよびBetドメインの実装
- 認証・認可

## Decisions

### Prismaフィールド名をsnake_caseで定義する

既存の `Todo` モデルはcamelCase（`createdAt`）だが、Topicは snake_case（`created_at`, `closed_at`）で定義する。

```prisma
model Topic {
  id         Int          @id @default(autoincrement())
  title      String
  status     TopicStatus  @default(open)
  closed_at  DateTime?
  created_at DateTime     @default(now())
}
```

ドメイン層（`Topic` クラス）ではcamelCaseプロパティに変換する。`from()` ファクトリでPrismaモデルからドメインオブジェクトへの変換時にフィールド名の差異を吸収する。

### Usecaseのインターフェース設計

`ITodoUsecase` と同じパターンで定義する。

```typescript
export interface ITopicUsecase {
  add(title: string): Promise<AddTopicResult>
  topics(): Promise<Topic[]>
}
```

`add` はタイトルのバリデーション（空文字・trim後空）を行い、通過した場合のみRepositoryに委譲する。ステータスは常に `open` で固定。

### Server Actionの責務

`actions.ts` はFormDataの解析と `revalidatePath` の呼び出しのみを担う。バリデーションロジックはUsecaseに委譲する。これはTodo実装と同じ方針。

### ページ構成

| ページ | パス | 役割 |
|---|---|---|
| 一覧 | `/topic` | SSRでTopic一覧を取得・表示 |
| 作成 | `/topic/new` | フォーム入力 → Server Action呼び出し |

作成後は `/topic` にリダイレクトせず、`revalidatePath("/topic")` のみ行う（Todoと同じ方針）。

## Risks / Trade-offs

- **Prismaモデルのsnake_case混在**: TodoはcamelCase、TopicはSnake_caseと混在するが、ドメイン層で吸収するため上位層への影響はない。将来的にTodoも統一する際の移行コストは残る。 → 今回はYAGNIとして許容。
- **closed_atはNullable**: ステータス変更を今回実装しないため `closed_at` は常にNULLで作成される。スキーマ上はNullableとして定義し、将来の変更操作実装時に使用する。
