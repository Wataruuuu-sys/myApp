## 1. Prismaスキーマ

- [x] 1.1 `TopicStatus` Enumを `prisma/schema.prisma` に追加（open / closed / answered）
- [x] 1.2 `Topic` モデルを `prisma/schema.prisma` に追加（id, title, status, closed_at, created_at）
- [x] 1.3 `bunx prisma migrate dev` でマイグレーションを実行する

## 2. ドメイン層

- [x] 2.1 `src/domain/Topic.ts` を作成する（id, title, status, closedAt, createdAt プロパティ、`from()` ファクトリ）

## 3. リポジトリ層

- [x] 3.1 `src/repositories/IRepository/ITopicRepository.ts` を作成する（`add` / `topics` メソッド定義）
- [x] 3.2 `src/repositories/TopicRepository.ts` を作成する（Prismaを使った実装）
- [x] 3.3 `src/tests/repositories/TopicRepository.test.ts` を作成する

## 4. ユースケース層

- [x] 4.1 `src/types/topic.ts` を作成する（`AddTopicRequest` / `AddTopicResult` 型定義）
- [x] 4.2 `src/usecases/IUsecase/ITopicUsecase.ts` を作成する（`add` / `topics` メソッド定義）
- [x] 4.3 `src/usecases/TopicUsecase.ts` を作成する（バリデーション・ドメイン変換・Repository委譲）
- [x] 4.4 `src/tests/usecases/TopicUsecase.test.ts` を作成する

## 5. DI配線

- [x] 5.1 `src/lib/container.ts` に `TopicRepository` と `TopicUsecase` の配線を追加する

## 6. Server Action

- [x] 6.1 `src/app/topic/actions.ts` を作成する（`topics()` / `addTopic(formData)` を実装）
- [x] 6.2 `src/tests/app/topic/actions.test.ts` を作成する

## 7. ページ

- [x] 7.1 `src/app/topic/page.tsx` を作成する（SSRでTopic一覧を取得・表示）
- [x] 7.2 `src/app/topic/new/page.tsx` を作成する（タイトル入力フォーム）
