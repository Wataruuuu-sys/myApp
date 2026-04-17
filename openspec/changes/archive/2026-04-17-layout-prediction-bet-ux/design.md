## Context

現状のアプリは以下の構成になっている：

- `app/layout.tsx` の `<body>` に幅制約なし → 全ページが画面幅いっぱいに広がる
- `PredictionRepository.submit()` が upsert（findFirst → update or create）を行っており、1トピック1予想を前提とした設計
- `topic/[id]/page.tsx` が `predictionList[0]` のみを取り出し、TopicDetail に単一の `prediction` を渡している
- TopicDetail が「予想カード」と「Betカード」を別セクションで表示し、Bet編集はフォームを常時表示している
- BetForm は Server Component から bound action を受け取る純粋な form 要素

## Goals / Non-Goals

**Goals:**
- 全ページにmax-width制約を持つレイアウトコンテナを適用する
- Predictionの新規作成と個別編集を分離し、1トピック複数予想を可能にする
- 予想カードとBetカードを統合した `PredictionBetCard` コンポーネントを作成する
- Betのインライン編集（表示モード ↔ 編集モード）をClient Componentで実現する

**Non-Goals:**
- 予想の削除機能
- Betの削除機能
- 複数ユーザーへの対応（認証機能）

## Decisions

### レイアウトコンテナの適用方法

`app/layout.tsx` の `<body>` 直下に `<div className="max-w-2xl mx-auto px-4 py-6">` 相当のラッパーを追加する。

**理由**: 各ページ個別に対応するよりもルートレイアウトで一括適用するほうが変更箇所が最小。`max-w-2xl`（672px）を基準とし、デスクトップでは中央寄せ・左右余白確保、モバイルでは `px-4` でエッジ余白を保つ。

代替案として検討した `container` クラスは Tailwind のデフォルトでは左寄せにならないため採用しない。

### Predictionの作成・更新の分離

`IPredictionRepository` に `create(topicId, predict)` と `update(predictionId, predict)` を追加し、既存の `submit()` を削除する。`PredictionUsecase` も同様に `create()` / `update()` に分解する。

**理由**: upsert は「1件制約」という仕様に依存したロジックであり、1:N に変更する以上存在できない。新規作成と更新は意図が異なるため、明示的に分けたほうが責務が明確。

`PredictionInput` 型を `CreatePredictionInput` / `UpdatePredictionInput` に分割し、`IPredictionUsecase` も `create` / `update` メソッドを持つインターフェースに変更する。

### Betデータのロードとデータ型

`topic/[id]/page.tsx` で全 predictions を取得後、各 prediction の Bet を `betUsecase.findByPredictionId()` でまとめて取得する。TopicDetail に渡す props は `PredictionWithBet[]` 型（`PredictionWithValue & { bet: Bet | null }`）の配列とする。

**理由**: TopicDetail は Server Component のため、props でデータを渡すのが自然。N+1 となるが、予想件数は少数前提であり現時点では許容する。

### PredictionBetCard のインライン編集実装

`PredictionBetCard` を `"use client"` コンポーネントとして実装し、`useState` で「表示モード / Bet編集モード / 予想編集モード」を管理する。

**理由**: 編集モード切り替えはクライアント状態であり Server Component では実現できない。各カードが独立した状態を持つため、カード単位で Client Component にする設計が最もシンプル。

Server Action（`saveBet`, `updatePrediction`）は引き続き props として受け取る（bound action）。

### saveBetAction・updatePredictionAction のバインド

`topic/[id]/page.tsx`（Server Component）でそれぞれの action を `bind(null, topicId, predictionId)` してから `PredictionBetCard` に渡す。

**理由**: Client Component からは直接 Server Action をインポートできるが、`topicId` / `predictionId` のバインドはサーバー側で行うほうがデータ型安全性が高い。現行の `saveBet` も同様のパターンを採用しているため一貫性がある。

## Risks / Trade-offs

- [予想件数増加時のN+1] 現状は `Promise.all` で各予想のBetを取得するが、予想が多くなると負荷が増す → 将来的に `predictionRepository.listWithBet()` のような JOIN クエリに移行可能。現時点は YAGNI で対応しない。
- [PredictionBetCard が Client Component] 親の TopicDetail が Server Component のまま維持できるが、カード内の状態はページ遷移でリセットされる → これは意図した動作。
- [既存テストの破壊] `submit()` メソッドの削除により、既存の PredictionUsecase / PredictionRepository テストを更新する必要がある。

## Migration Plan

DBスキーマ変更なし。コードのみの変更で完結する。

1. `IPredictionRepository` / `PredictionRepository` に `create` / `update` 追加、`submit` 削除
2. `IPredictionUsecase` / `PredictionUsecase` を同様に更新
3. `types/prediction.ts` の型定義を更新
4. Server Action（`submitPrediction`）を `createPrediction` / `updatePrediction` に分割
5. `topic/[id]/page.tsx` を複数予想 + Betデータ取得に変更
6. `PredictionBetCard` コンポーネント新規作成
7. `TopicDetail` / `PredictionForm` を新 props に対応させ更新
8. `app/layout.tsx` にレイアウトコンテナを追加

## Open Questions

- 予想一覧ページ（`/topic/[id]/predictions`）は引き続き必要か、それとも TopicDetail に統合するか（現状はそのまま維持する方針）
