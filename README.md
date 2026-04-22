# アプリケーション概要

本アプリケーションは Next.js を用いたモノリス構成の Web アプリケーションです。
フロントエンドとバックエンドを単一リポジトリで管理し、開発効率・型安全性・運用性のバランスを重視した設計としています。

## 技術選定

- Next.js（App Router）
本プロジェクトでは Next.js（App Router）を採用しました。
フロントエンドとバックエンドを同一アプリケーションで実装可能
Server Components / Server Actions により、API 層を過剰に分離せずに実装できる
SEO・パフォーマンスを意識した構成を標準で実現できる
小〜中規模の Web サービスにおいては、マイクロサービス化よりも
責務を整理したモノリス構成の方が保守性・生産性が高いと判断し、本構成を選択しました。

- Server Actions
Server Actions を利用することで、画面操作に密接に紐づくサーバ処理を型安全かつシンプルに実装しています。
API 定義・fetch 処理を省略でき、実装量を削減
フロントエンドとバックエンド間で型が分断されない
認証情報や環境変数を安全に扱える
ただし、ビジネスロジックを Server Actions に直接書かず、
ドメイン層に責務を分離することで、将来的な API 分離やスケールにも対応可能な設計としています。

- TypeScript
全体を TypeScript で統一しています。
フロントエンドからバックエンドまで 一貫した型安全性
ドメインモデル・入力バリデーション・DB スキーマの整合性を担保
実装時点での不具合検出による品質向上
型設計を意識することで、仕様をコードとして表現できる構成を目指しました。

- Prisma
ORM には Prisma を採用しています。
TypeScript との親和性が高く、型安全な DB アクセスが可能
マイグレーション管理が容易
スキーマ定義を通じて、DB 構造をコードベースで管理できる
Repository 層を設け、アプリケーションロジックから
ORM 実装を直接参照しない設計としています。

```
[ Browser ]
     ↓
[ Next.js App ]
 ├─ UI (React / App Router)
 ├─ Server Actions
 ├─ API Routes（外部連携・将来分離用）
 ├─ Domain / Service / Repository
     ↓
[ PostgreSQL (RDS) ]
```

## 開発環境セットアップ

### 必要なツール

- [Bun](https://bun.sh) v1 以上
- [PostgreSQL](https://www.postgresql.org) v17（ホストにインストール）

### PostgreSQL のインストール（macOS）

```bash
brew install postgresql@17
bun run pg:start
```

> `bun run pg:stop` で停止できます。

初回のみ、アプリ用のユーザと DB を作成します。

```bash
bun run pg:setup
```

### セットアップ

```bash
# 依存パッケージのインストール
bun install

# 環境変数の設定
cp .env.example .env
```

`.env` の `DATABASE_URL` が上記で作成した DB に向いていることを確認してください。

```
DATABASE_URL=postgresql://myapp:myapp@localhost:5432/myapp
```

### 起動

```bash
bun dev
```

`prisma generate`（クライアント生成）→ `prisma db push`（スキーマ適用）→ Next.js 起動 の順で自動実行されます。

### CI モード（全コンテナ構成）

ホスト環境に依存せずコンテナのみで動かす場合は、[Apple Container](https://developer.apple.com/documentation/virtualization) を使用します。

```bash
# イメージビルド（初回・Dockerfile 変更時）
make build-db
make build-web

# 起動（DB + web コンテナ）
make container-up

# 停止
make container-down
```
