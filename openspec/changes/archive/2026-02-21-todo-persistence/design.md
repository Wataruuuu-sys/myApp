## Context

TODOページは Client Component + `useState` で動作しており、データはブラウザ内にのみ存在する。前チェンジで Prisma + PostgreSQL 基盤（Todo model, マイグレーション済み）が構築されたため、これを活用してDB永続化に切り替える。

## Goals / Non-Goals

**Goals:**
- TODOの一覧取得と追加をDB経由に切り替える
- Server Component + Server Actions パターンを確立する
- 既存テストを新アーキテクチャに合わせて維持する

**Non-Goals:**
- 削除・更新・完了トグルの実装（次のチェンジで行う）
- UIのスタイリング改善
- エラーハンドリングの作り込み

## Decisions

### Decision 1: Server Component + Server Actions

TODOページを Server Component に変更し、一覧取得はサーバーサイドで直接 Prisma を呼ぶ。追加操作は Server Actions で実装する。

代替案: API Route（`/api/todo`）を作って Client Component から fetch する方法もあるが、Next.js App Router では Server Actions がより直接的で、ボイラープレートが少ない。

### Decision 2: フォーム部分を Client Component に分離

Server Component のページからフォーム（入力 + 追加ボタン）を Client Component として切り出す。一覧表示は Server Component 側で行い、フォーム送信後は `revalidatePath` で再取得する。

### Decision 3: Prisma Client のシングルトン管理

開発環境でのホットリロード時に Prisma Client が複数インスタンス生成されるのを防ぐため、`globalThis` にキャッシュするシングルトンパターンを採用する。`src/lib/prisma.ts` に配置。

### Decision 4: テストでは Prisma をモックする

テストはDBに依存せず、Prisma Client をモックして実行する。Server Component のテストは直接関数を呼び出す形式で行う。

## Risks / Trade-offs

- Server Component のテストは React Testing Library だけでは難しい場合がある → Server Actions のモックとコンポーネントの分離で対処
- `revalidatePath` によるページ再描画はフルリロードに近い → 現段階では許容。パフォーマンスが問題になったら楽観的更新を検討
