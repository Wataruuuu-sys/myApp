## Why

現在アプリケーションに認証機能が存在せず、すべてのページへのアクセスが制限されていない。adminロールを導入することで、トピックへの回答登録などの特権操作をadminユーザーのみに限定し、権限によるアクセス制御を実現する。

## What Changes

- Auth.js（NextAuth.js v5）をCredentials Providerで導入し、ID・パスワードによるログイン機能を追加する
- `User` エンティティおよびDBテーブルを追加する（id, hashedPassword, role）
- ロールは `admin` と `user` の2種類とし、`user` は最小権限の基底ロール、`admin` は追加権限を持つ上位ロール
- `/topic/[id]/answer` ページおよびその Server Action をadminロール限定にアクセス制御する（`topic-answer` の要件変更）
- 未認証ユーザーを `/login` にリダイレクトするmiddlewareを追加する

## Capabilities

### New Capabilities

- `user-auth`: ID・パスワードによる認証、Auth.jsセッション管理、ログイン/ログアウト、ロール（admin/user）の定義とセッションへの付与

### Modified Capabilities

- `topic-answer`: 回答登録操作をadminロール保持者のみに制限する要件を追加

## Impact

- **依存追加**: `next-auth`（Auth.js v5）、`bcryptjs`
- **DBスキーマ**: `User` テーブルを新規追加（`id`, `hashedPassword`, `role`）
- **middleware**: Next.js middlewareでセッション検証・ルートガードを実装
- **既存ページ**: `/topic/[id]/answer` のアクセス制御が変わるため、UIおよびServer Actionにauthチェックを追加
