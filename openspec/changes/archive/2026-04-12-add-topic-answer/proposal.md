## Why

Topic に対して回答を登録する手段がなく、Topic の `answered` ステータスが活用できていない。回答ページを実装することで、Topic のライフサイクル（open → answered）を完成させる。

## What Changes

- `Answer` モデル・`AnswerNumber` モデルを Prisma スキーマに追加する
- `/topic/[id]/answer` ページを新設し、回答フォームを提供する
- 回答送信時に Topic のステータスを `answered` に更新する
- Topic 一覧・詳細ページに回答済みステータスを反映する（既存 UI への影響なし）

## Capabilities

### New Capabilities

- `topic-answer`: `/topic/[id]/answer` ページでの回答登録機能（フォーム表示・Server Action・Usecase・Repository を含む）

### Modified Capabilities

- `prisma-schema`: `Answer` モデル（id, fk_topic_id, answer_type, created_at）および `AnswerNumber` モデル（id, fk_answer_id, answer, created_at）を追加する

## Impact

- **Prisma スキーマ**: `Answer`・`AnswerNumber` モデルを追加。`Topic` との外部キー関係を定義
- **新規ファイル**: `src/domain/Answer.ts`、`src/usecases/AnswerUsecase.ts`、`src/repositories/AnswerRepository.ts`、`src/app/topic/[id]/answer/page.tsx`、`src/app/topic/[id]/answer/actions.ts`
- **既存ファイル**: `src/lib/container.ts`（DI配線追加）
- **依存関係**: 既存の `Topic` ドメインおよび `ITopic` 系インターフェースに依存
