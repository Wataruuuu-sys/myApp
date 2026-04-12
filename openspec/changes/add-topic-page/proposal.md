## Why

賭け予測システムの基盤となる「Topic（テーマ）」ドメインが存在しない。予測賭けを行うためにはまず賭けの対象となるTopicを作成・管理できる機能が必要なため、今回導入する。

## What Changes

- `Topic` Prismaモデルを追加（id, title, status, closed_at, created_at）
- `TopicStatus` Enum を追加（open / closed / answered）
- クリーンアーキテクチャに沿ったTopic共通層（domain / repository / usecase）を追加
- `/topic` ページを追加（Topic一覧表示）
- `/topic/new` ページを追加（Topic新規作成フォーム）

## Capabilities

### New Capabilities

- `topic-list`: `/topic` ページでの保存済みTopic一覧表示。タイトルとステータスを表示する。
- `topic-create`: `/topic/new` ページでのTopic新規作成。タイトルを入力してDBに保存する。作成時のステータスはopenで固定。

### Modified Capabilities

- `prisma-schema`: TopicモデルおよびTopicStatus Enumの追加

## Impact

- `prisma/schema.prisma`: TopicモデルとTopicStatus Enum追加、マイグレーション実行が必要
- `src/domain/`: Topic エンティティクラス追加
- `src/repositories/`: TopicRepository実装・ITopicRepositoryインターフェース追加
- `src/usecases/`: TopicUsecase実装・ITopicUsecaseインターフェース追加
- `src/types/`: Server Action用のRequest/Result型追加
- `src/app/topic/page.tsx`: Topic一覧ページ追加
- `src/app/topic/new/page.tsx`: Topic作成ページ追加
- `src/app/topic/actions.ts`: Server Action追加
- `src/lib/container.ts`: Topic依存関係の配線追加
