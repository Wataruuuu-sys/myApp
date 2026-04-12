## Context

Topic モデルは `open` / `closed` / `answered` の3状態を持つが、`answered` への遷移手段が存在しない。本変更では `Answer`・`AnswerNumber` モデルを追加し、回答登録ページを実装することで、Topic のライフサイクルを完成させる。

既存の Topic 機能は Clean Architecture（domain / usecase / repository / app）で実装されており、本変更も同パターンに従う。

## Goals / Non-Goals

**Goals:**
- `Answer`・`AnswerNumber` モデルを Prisma スキーマに追加する
- `/topic/[id]/answer` ページで数値回答を登録できる
- 回答登録後に Topic ステータスを `answered` に更新する
- Clean Architecture のレイヤー構造・依存方向を維持する

**Non-Goals:**
- 回答の編集・削除
- `answer_type` による分岐処理（今回は数値回答のみ）
- Topic 一覧ページの UI 変更
- 認証・認可

## Decisions

### 1. Answer ドメインを独立したユースケース・リポジトリで管理する

**決定:** `AnswerUsecase` / `AnswerRepository` を新設し、Topic の Usecase/Repository とは分離する。

**理由:** Topic の状態更新（`answered`）は Answer 登録のトランザクション内で行うべきだが、既存の `ITopicRepository` を `AnswerUsecase` に注入することで、依存を明示的に保ちつつ Topic 状態更新を実現できる。Topic 側の Usecase/Repository に回答ロジックを混入させるより責務が明確になる。

**代替案:** `TopicUsecase` に `answer` メソッドを追加 → Topic のユースケースが肥大化するため却下。

### 2. Topic ステータス更新は AnswerUsecase が ITopicRepository を通じて行う

**決定:** `AnswerUsecase` のコンストラクタに `IAnswerRepository` と `ITopicRepository` を注入し、回答登録と同時に Topic を `answered` に更新する。

**理由:** Answer と Topic の状態変更を一つのユースケースで原子的に扱うことで整合性を保つ。Prisma トランザクション（`$transaction`）は Repository 層に隠蔽する。

**代替案:** `AnswerRepository` 内で Topic テーブルを直接更新 → Repository の責務を超えるため却下。

### 3. answer_type は Prisma Enum として定義する

**決定:** `answer_type` を `AnswerType` Enum（`number` のみ）として Prisma スキーマに定義する。

**理由:** 将来的な型追加を想定し、文字列リテラルより型安全な Enum を採用する。ただし今回実装するのは `number` のみ（YAGNI に反しないよう Enum 定義はするが分岐処理は書かない）。

### 4. フォームページのルーティングは `/topic/[id]/answer`

**決定:** Next.js App Router の動的ルートとして `app/topic/[id]/answer/page.tsx` を新設する。

**理由:** Topic ID に紐づく操作であり、RESTful な URL 構造が自然。

## Risks / Trade-offs

- **Topic が存在しない場合の `[id]` アクセス** → Usecase で Topic の存在確認を行い、存在しない場合はエラー Result を返す
- **既に `answered` の Topic への再回答** → Usecase でステータスを確認し、`already_answered` エラーを返す
- **Prisma スキーマ変更による `prisma db push` 必要** → 開発環境では `prisma db push` で完結（migrationsディレクトリは使用しない）

## Open Questions

- なし
