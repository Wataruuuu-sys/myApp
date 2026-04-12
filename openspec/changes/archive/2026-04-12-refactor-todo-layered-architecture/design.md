## Context

現状、`app/todo/actions.ts` と `app/todo/page.tsx` がPrismaを直接参照している。バリデーションロジックとDBアクセスが同一ファイルに混在しており、テスト時はPrismaをモックする必要がある。ドメインの増加を前提とした設計への移行タイミングとして本変更を行う。

## Goals / Non-Goals

**Goals:**
- Server Action・Usecase・Repository・Domainの4層に責務を分離する
- 各層がインターフェースに依存し、テスト時にモックを差し替えられる設計にする
- `lib/container.ts` でDI配線を一元管理し、各層の結合を疎にする
- Server ActionがActionResult型を返却し、呼び出し元が結果を型安全に扱えるようにする

**Non-Goals:**
- todo-list以外のドメインへの適用（本変更はtodoのみ）
- DIコンテナライブラリの導入
- ユーザー向け機能の追加・変更

## Decisions

### 1. ディレクトリ構成: 層別分離

```
src/
├── domain/
│   └── Todo.ts
├── usecases/
│   ├── IUsecase/
│   │   └── ITodoUsecase.ts
│   └── TodoUsecase.ts
├── repositories/
│   ├── IRepository/
│   │   └── ITodoRepository.ts
│   └── TodoRepository.ts
├── types/
│   └── todo.ts
└── lib/
    ├── prisma.ts        （変更なし）
    └── container.ts
```

**理由**: ドメインが増えた際に各層の責務が明確に拡張できる。feature単位のまとめ方（`features/todo/`）より層の境界が見やすく、クリーンアーキテクチャの依存方向を強制しやすい。

### 2. Repository インターフェースは TodoModel を返す

`ITodoRepository` の戻り値はPrisma生成の `TodoModel` とする。ドメインへの詰め替え（`Todo.from()`）はUsecase層が担う。

**理由**: Repositoryは純粋なデータアクセス層とし、ドメイン変換の知識を持たせない。UsecaseがTodoModelとTodoドメインオブジェクトの橋渡し役になることで、Repository実装の差し替えが容易になる。

**代替案**: Repository自身が `Todo` を返す設計。インターフェースがPrismaに依存しない利点があるが、Repositoryが変換責任を持つことになり責務が増える。

### 3. DI配線は lib/container.ts のモジュールシングルトン

```typescript
// lib/container.ts
const todoRepository = new TodoRepository()
export const todoUsecase: ITodoUsecase = new TodoUsecase(todoRepository)
```

`actions.ts` と `page.tsx` はここからimportして使う。

**理由**: Next.jsサーバー環境ではDIコンテナライブラリは不要。モジュールシングルトンで十分であり、テスト時は各テストファイルでコンストラクタ引数にモックを渡す形で対応できる。

### 4. Server ActionはActionResult型を返す

```typescript
// types/todo.ts
export type AddTodoResult =
  | { ok: true }
  | { ok: false; error: "invalid_title" }
```

**理由**: `void` 返却ではクライアント側が成否を判定できない。判別可能なunion typeにより呼び出し元が型安全にエラーハンドリングできる。

### 5. テスト戦略: 層別モック境界

| テストファイル | モック対象 | 検証観点 |
|---|---|---|
| `tests/app/todo/actions.test.ts` | `ITodoUsecase` | `AddTodoResult` の返却値、`revalidatePath` の呼び出し |
| `tests/usecases/TodoUsecase.test.ts` | `ITodoRepository` | バリデーション・trim・空文字ガード |
| `tests/repositories/TodoRepository.test.ts` | Prisma client | 正しいクエリ引数・`TodoModel` の返却 |

## Risks / Trade-offs

- **ファイル数の増加** → 各ファイルの責務が明確なため、慣れれば読みやすさは向上する。命名規則（PascalCase、インターフェースは `I` プレフィックス）を徹底する。

- **container.ts がNext.jsのエッジランタイムと非互換になる可能性** → 現状はNode.jsランタイム前提（Prisma + pg adapter）なので問題なし。エッジ移行時は再設計が必要。

- **TodoUsecase が TodoModel を知る** → Prisma生成型への依存がUsecase層に入る。完全なクリーンアーキテクチャではないが、`ITodoRepository` のインターフェースを境界として依存を封じ込める。

## Open Questions

なし（探索フェーズで設計を確定済み）
