## 1. Prisma スキーマ

- [x] 1.1 `AnswerType` Enum を `prisma/schema.prisma` に追加する（`number` のみ）
- [x] 1.2 `Answer` モデルを追加する（id, fk_topic_id, answer_type, created_at）
- [x] 1.3 `AnswerNumber` モデルを追加する（id, fk_answer_id, answer, created_at）
- [x] 1.4 `bunx prisma db push` を実行してスキーマを DB に反映する
- [x] 1.5 Prisma クライアントを再生成する（`bunx prisma generate`）

## 2. ドメイン・型定義

- [x] 2.1 `src/domain/Answer.ts` を作成する（`Answer` エンティティクラス）
- [x] 2.2 `src/types/answer.ts` を作成する（`SubmitAnswerResult` 型を定義）

## 3. リポジトリ層

- [x] 3.1 `src/repositories/IRepository/IAnswerRepository.ts` を作成する（`submit` メソッドを定義）
- [x] 3.2 `src/repositories/AnswerRepository.ts` を作成する（`Answer` + `AnswerNumber` の保存と `Topic` ステータス更新をトランザクションで実装）

## 4. ユースケース層

- [x] 4.1 `src/usecases/IUsecase/IAnswerUsecase.ts` を作成する（`submit` メソッドを定義）
- [x] 4.2 `src/usecases/AnswerUsecase.ts` を作成する（バリデーション・既回答チェック・リポジトリ呼び出しを実装）

## 5. DI 配線

- [x] 5.1 `src/lib/container.ts` に `answerRepository` と `answerUsecase` を追加する

## 6. App 層（Server Action・ページ）

- [x] 6.1 `src/app/topic/[id]/answer/actions.ts` を作成する（FormData 解析・Usecase 呼び出し・`revalidatePath`）
- [x] 6.2 `src/app/topic/[id]/answer/page.tsx` を作成する（Topic タイトル表示・数値入力フォーム・SSR）

## 7. テスト

- [x] 7.1 `src/tests/app/topic/answer/actions.test.ts` を作成する（`IAnswerUsecase` をモック、Result 型・`revalidatePath` を検証）
- [x] 7.2 `src/tests/usecases/AnswerUsecase.test.ts` を作成する（`IAnswerRepository`・`ITopicRepository` をモック、バリデーション・既回答チェックを検証）
- [x] 7.3 `src/tests/repositories/AnswerRepository.test.ts` を作成する（Prisma クライアントをモック、クエリ引数・トランザクションを検証）
