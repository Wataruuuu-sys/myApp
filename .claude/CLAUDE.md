# 基本ルール

## 対話

1. 日本語で回答する

## アーキテクチャ

`src/` 配下はクリーンアーキテクチャの層別ディレクトリ構成を採用する。

```
src/
├── app/           # Next.js App Router（Server Action・Page）
├── domain/        # エンティティクラス（ビジネスオブジェクト）
├── usecases/      # ユースケース実装
│   └── IUsecase/  # ユースケースインターフェース
├── repositories/  # データアクセス実装（Prisma）
│   └── IRepository/ # リポジトリインターフェース
├── types/         # Server Action の Request/Result 型
└── lib/
    ├── prisma.ts  # Prismaクライアントシングルトン
    └── container.ts # DI配線（モジュールシングルトン）
```

### 依存方向のルール

- `app/` → `lib/container` のみ参照し、Usecase・Repository を直接 import しない
- `usecases/` → `IRepository` インターフェースに依存し、Prisma を直接参照しない
- `repositories/` → Prisma を使用し、ドメイン変換の知識を持たない
- `domain/` → 外部ライブラリに依存しない
- インターフェースは `I` プレフィックスを付ける（例: `ITodoUsecase`, `ITodoRepository`）

### DI配線

`lib/container.ts` でモジュールシングルトンとして配線する。DIライブラリは使用しない。

```typescript
const todoRepository = new TodoRepository()
export const todoUsecase: ITodoUsecase = new TodoUsecase(todoRepository)
```

### テスト戦略

| テスト対象 | モック対象 | 検証観点 |
|---|---|---|
| `app/todo/actions.ts` | `ITodoUsecase` | Result 型の返却値、`revalidatePath` 呼び出し |
| `usecases/TodoUsecase.ts` | `ITodoRepository` | バリデーション・trim・ドメイン変換 |
| `repositories/TodoRepository.ts` | Prisma client | クエリ引数・戻り値 |