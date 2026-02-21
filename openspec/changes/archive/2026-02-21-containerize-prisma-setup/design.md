## Context

Next.js 16 + bun のプロジェクト。現状はローカル開発のみでコンテナ化されておらず、DB層も存在しない。CI/CDでの再現性を確保するため、アプリケーション全体をコンテナ化し、Prisma + PostgreSQL の基盤を構築する。

## Goals / Non-Goals

**Goals:**
- Docker Compose で app + PostgreSQL をワンコマンドで起動できる
- Prisma Schema に Todo model を定義し、マイグレーションを実行できる
- CI/CD環境で同じコンテナ構成を再現できる

**Non-Goals:**
- TODOページのDB永続化への切り替え（次のチェンジで行う）
- 本番環境へのデプロイ設定
- CI/CDパイプラインの構築自体（再現可能な基盤を作るまで）

## Decisions

### Decision 1: multi-stage build の Dockerfile

dev / build の2ステージを1つの Dockerfile で管理する。dev ステージは `bun dev` でホットリロード対応、build ステージは `bun run build` で本番ビルドを生成する。CI/CDでは build ステージを使用する。

代替案: Dockerfile.dev と Dockerfile を分離する方法もあるが、ファイル管理の一貫性と CI/CD での再利用性を優先して単一ファイルとした。

### Decision 2: bun ベースイメージ

`oven/bun` 公式イメージをベースに使用する。プロジェクトのパッケージマネージャが bun であるため、node イメージ + bun インストールより軽量かつシンプル。

### Decision 3: ソースコードのバインドマウント

dev ステージではホスト側のソースコードをコンテナにマウントし、ホットリロードを実現する。`node_modules` はコンテナ内で独立管理し、ホスト側と競合しないようにする。

### Decision 4: PostgreSQL 17

安定版の最新メジャーバージョンを採用。`healthcheck` で起動完了を検知し、app コンテナの起動順序を制御する。

### Decision 5: Prisma の ID 採番は autoincrement

分散環境を想定しないシンプルな構成のため、連番IDを採用する。

## Risks / Trade-offs

- バインドマウントのファイル監視はmacOSで遅延が生じる場合がある → 開発体験に影響が出たら polling 設定で対処
- `node_modules` のコンテナ内独立管理により、ホスト側でIDEの補完が効かなくなる可能性がある → ホスト側にも `bun install` を実行して対応
