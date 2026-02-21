## Why

開発環境の再現性とCI/CDでの一貫性を確保するために、アプリケーション全体をコンテナ化し、Prisma + PostgreSQLによるデータ永続化の基盤を構築する。現状はローカル状態のみでDB層が存在しないため、CRUD操作の基盤となるORM・マイグレーション環境を先に整備する。

## What Changes

- Dockerfile（multi-stage build: dev / build）を追加
- docker-compose.yaml で app + PostgreSQL の2サービス構成を追加
- Prisma を導入し、Todo モデルのスキーマ定義と初回マイグレーションを実行
- 環境変数管理（.env / .env.example）を整備

## Capabilities

### New Capabilities
- `container-environment`: Docker Compose によるアプリケーションとDBのコンテナ環境
- `prisma-schema`: Prisma ORM のスキーマ定義とマイグレーション基盤

### Modified Capabilities

なし

## Impact

- `Dockerfile`: 新規作成（multi-stage build）
- `docker-compose.yaml`: 新規作成（app + db）
- `prisma/schema.prisma`: 新規作成（Todo model, autoincrement ID）
- `.env.example`: 新規作成（DATABASE_URL テンプレート）
- `.env`: 新規作成（gitignore対象）
- `.gitignore`: .env 追加
- `package.json`: prisma 依存追加
