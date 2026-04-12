## Why

Server ActionがPrismaを直接呼び出しており、ビジネスロジックとデータアクセスが混在している。ドメインが増える前にクリーンアーキテクチャの層分離を導入し、テスタビリティと責務分離を確立する。

## What Changes

- **BREAKING** `app/todo/actions.ts` のPrisma直接呼び出しを廃止し、Usecase層経由に変更する
- **BREAKING** `app/todo/page.tsx` のPrisma直接呼び出しを廃止し、Usecase層経由に変更する
- `usecases/` ディレクトリを新設し、`ITodoUsecase` インターフェースと `TodoUsecase` 実装クラスを追加する
- `repositories/` ディレクトリを新設し、`ITodoRepository` インターフェースと `TodoRepository` 実装クラスを追加する
- `domain/` ディレクトリを新設し、`Todo` エンティティクラス（詰め替え＋操作）を追加する
- `types/todo.ts` を新設し、Server ActionのRequest/Response型を定義する
- `lib/container.ts` を新設し、依存性注入の配線を行う
- テストを各層ごとに分離し、それぞれの責務に集中したテストに再編する

## Capabilities

### New Capabilities

なし（ユーザー向けの機能追加はない）

### Modified Capabilities

- `todo-list`: Server ActionおよびSSRのデータ取得がUsecase層を経由することを要件に追加する

## Impact

- `src/app/todo/actions.ts` — 全面的に書き直し
- `src/app/todo/page.tsx` — Prisma直接参照を除去
- `src/tests/app/todo/actions.test.ts` — Usecaseモックに変更、ActionResult検証に集中
- 新規ファイル: `usecases/`, `repositories/`, `domain/`, `types/`, `lib/container.ts`
- 既存の `lib/prisma.ts` は変更なし
