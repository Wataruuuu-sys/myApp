## 1. Prisma Client 基盤

- [x] 1.1 Prisma Client を生成する（`bunx prisma generate`）
- [x] 1.2 `src/lib/prisma.ts` を作成し、シングルトンパターンで Prisma Client を管理する

## 2. Server Actions

- [x] 2.1 TODO追加の Server Action を作成する（`src/app/todo/actions.ts`）

## 3. ページ書き換え

- [x] 3.1 フォーム部分を Client Component に分離する（`src/app/todo/todo-form.tsx`）
- [x] 3.2 `src/app/todo/page.tsx` を Server Component に書き換え、Prisma 経由でTODO一覧を取得する

## 4. テスト

- [x] 4.1 `src/tests/app/todo/page.test.tsx` を新アーキテクチャに合わせて修正する

## 5. 検証

- [x] 5.1 既存テストが通ることを確認する
- [x] 5.2 `docker compose up` でコンテナ起動し、ブラウザからTODOの追加・永続化を確認する
