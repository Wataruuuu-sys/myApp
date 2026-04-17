## 1. 依存パッケージの追加

- [ ] 1.1 `next-auth@beta` を package.json に追加する
- [ ] 1.2 `bcryptjs` と `@types/bcryptjs` を package.json に追加する

## 2. Prisma スキーマの更新

- [ ] 2.1 `prisma/schema.prisma` に `Role` enum（`admin`, `user`）を追加する
- [ ] 2.2 `prisma/schema.prisma` に `User` モデル（`id: String @id @default(cuid())`, `loginId: String @unique`, `hashedPassword: String`, `role: Role @default(user)`, `created_at: DateTime`）を追加する
- [ ] 2.3 `prisma db push` でスキーマをDBに反映する

## 3. 初期 admin ユーザーの seed スクリプト

- [ ] 3.1 `prisma/seed.ts` を作成し、bcryptjs でハッシュ化したパスワードを持つ admin ユーザーを upsert するスクリプトを実装する
- [ ] 3.2 `package.json` の `prisma.seed` フィールドに seed スクリプトのパスを設定する

## 4. Auth.js 設定

- [ ] 4.1 `src/lib/auth.ts` を作成し、Credentials Provider（loginId・パスワード認証）と JWT セッション戦略を設定する
- [ ] 4.2 `authorize` コールバック内で Prisma から User を取得し bcryptjs でパスワード検証する実装を追加する
- [ ] 4.3 `session` コールバックで `token.role` を `session.user.role` に付与する実装を追加する
- [ ] 4.4 `src/types/next-auth.d.ts` を作成し、`Session.user.role` の型拡張（`"admin" | "user"`）を定義する
- [ ] 4.5 `src/app/api/auth/[...nextauth]/route.ts` を作成し、Auth.js の `GET`/`POST` ハンドラをエクスポートする

## 5. Middleware によるルートガード

- [ ] 5.1 `src/middleware.ts` を作成し、未認証ユーザーを `/login` にリダイレクトするルートガードを実装する（保護対象: `/topic` 以下）
- [ ] 5.2 認証済みユーザーが `/login` にアクセスした場合に `/topic` にリダイレクトする処理を middleware に追加する

## 6. ログインページの実装

- [ ] 6.1 `src/app/login/page.tsx` を作成し、loginId とパスワードの入力フォームを実装する
- [ ] 6.2 フォーム送信で Auth.js の `signIn("credentials", ...)` を呼び出す Server Action を実装する
- [ ] 6.3 認証失敗時のエラーメッセージ表示を実装する

## 7. ログアウト機能

- [ ] 7.1 ログアウトボタン（または UI 要素）を配置するコンポーネントを作成し、Auth.js の `signOut()` を呼び出す実装を追加する
- [ ] 7.2 既存のレイアウト（`src/app/layout.tsx` または topic 配下のレイアウト）にログアウトコンポーネントを組み込む

## 8. topic-answer の admin ガード

- [ ] 8.1 `src/types/answer.ts` の `SubmitAnswerResult` error ユニオンに `"forbidden"` を追加する
- [ ] 8.2 `src/app/topic/[id]/answer/actions.ts` の `submitAnswer` に `auth()` でセッション取得・role 検証を追加し、admin 以外は `{ ok: false, error: "forbidden" }` を返すようにする
- [ ] 8.3 `src/app/topic/[id]/answer/page.tsx` でセッションの role を確認し、admin 以外には 403 相当のページを表示する実装を追加する
