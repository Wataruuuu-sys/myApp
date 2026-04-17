## Context

現在のアプリケーションは認証機能を持たず、すべてのルートが公開されている。クリーンアーキテクチャ（app → usecase → repository）を採用しており、DI は `src/lib/container.ts` で手動配線している。Next.js 16 を使用。

## Goals / Non-Goals

**Goals:**
- Auth.js v5（next-auth@beta）のCredentials Providerでメール/ID・パスワード認証を実現する
- `admin` / `user` の2ロールを定義し、adminロールに追加権限（トピック回答）を付与する
- 未認証ユーザーをログインページにリダイレクトするmiddlewareを実装する
- `/topic/[id]/answer` ページおよびServer ActionをadminガードによりAdmin限定にする

**Non-Goals:**
- OAuth / ソーシャルログインは対象外
- ユーザー登録UI（サインアップ画面）は対象外（初期ユーザーはシードデータまたは直接DB投入）
- パスワードリセット機能は対象外

## Decisions

### 1. Auth.js v5 を lib 層に配置する

`src/lib/auth.ts` に NextAuth 設定を集約する。Auth.js の `authorize` コールバック内では Prisma クライアントを直接使用する。

- **理由**: Auth.js の認証フローは infrastructure 層の関心事であり、Usecase/Repository を経由させると抽象化が過剰になる。`lib/` 層は Prisma を直接使用できる（`lib/prisma.ts` と同等の位置付け）。
- **代替案**: `UserRepository` → `UserUsecase` → `authorize` の経路。構造は正しいが、認証という単一目的のために Usecase インターフェースを追加するのは YAGNI に反すると判断。

### 2. セッション戦略は JWT（stateless）を採用する

DB にセッションテーブルを作らず、JWT に role を含める。

- **理由**: DB セッション方式はセッションテーブルの追加と定期的なクリーンアップが必要。このアプリのスケール要件では JWT で十分。
- **代替案**: DB セッション。Auth.js のデフォルトだが今回は不採用。

### 3. ロールは User テーブルの enum で管理する

```prisma
enum Role {
  admin
  user
}

model User {
  id             String   @id @default(cuid())
  loginId        String   @unique
  hashedPassword String
  role           Role     @default(user)
  created_at     DateTime @default(now())
}
```

- **理由**: ロール数が少なく固定的なため、別テーブルにする必要がない。変更は直接 DB 操作で対応。
- `loginId` を認証キーとして採用（メールアドレスではなく任意のID文字列）。

### 4. Session 型を拡張して role を含める

Auth.js のセッション型拡張（`types/next-auth.d.ts`）で `session.user.role` を参照可能にする。

### 5. Admin ガードはServer Action 内と middleware の両方で行う

- **middleware**: ルート単位の認証チェック（未認証 → `/login` へリダイレクト）
- **Server Action**: admin ロールチェック（`session.user.role !== 'admin'` → エラー返却）

- **理由**: middleware は認証（ログイン済みか）を担い、認可（ロール）はServer Action で行う。middleware でのロールチェックも可能だが、Server Action 側でも必ず検証することで多重防御とする。

### 6. ログインページは `/login` に配置する

`src/app/login/page.tsx` にCredentials フォームを配置。認証成功後は `/topic` にリダイレクト。

## Risks / Trade-offs

- **[next-auth@beta の安定性]** → Auth.js v5 は next-auth@beta であり API が変わる可能性がある。ただし Next.js App Router への対応は v5 のみのため採用不可避。
- **[初期ユーザーの作成手段がない]** → サインアップ画面を作らないため、admin ユーザーは seed スクリプトまたは直接 DB 投入が必要。seed スクリプトを `prisma/seed.ts` に用意することで対処。
- **[JWT に role が入るためロール変更が即時反映されない]** → セッション有効期限内は古い role が使われる。このアプリではロール変更頻度が極めて低いため許容する。

## Migration Plan

1. `next-auth@beta` および `bcryptjs` を追加
2. Prisma スキーマに `User` モデルと `Role` enum を追加 → `prisma db push`
3. `prisma/seed.ts` に初期 admin ユーザーを追加
4. `src/lib/auth.ts` を作成（NextAuth Credentials Provider 設定）
5. `src/middleware.ts` を作成（ルートガード）
6. `src/app/login/` を作成（ログインページ）
7. `src/app/topic/[id]/answer/` の Server Action に admin ガードを追加
8. Auth.js の `GET`/`POST` ハンドラを `src/app/api/auth/[...nextauth]/route.ts` に追加

ロールバック: `User` テーブル削除、next-auth パッケージ削除、middleware 削除で元の状態に戻る。データ損失なし（新規追加のみ）。

## Open Questions

- ログイン後のリダイレクト先は `/topic` 固定でよいか？（リダイレクト先保存の必要性）
- セッション有効期限はデフォルト（30日）でよいか？
