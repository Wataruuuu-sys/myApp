## 1. レイアウトコンテナの適用

- [x] 1.1 `app/layout.tsx` の `<body>` 直下に max-width・パディング・中央寄せのラッパー div を追加する

## 2. 型定義の更新

- [x] 2.1 `types/prediction.ts` の `PredictionInput` を `CreatePredictionInput`（topicId, predict）/ `UpdatePredictionInput`（predictionId, predict）に分割する
- [x] 2.2 `types/prediction.ts` に `PredictionWithBet` 型（`PredictionWithValue & { bet: Bet | null }`）を追加する
- [x] 2.3 `types/prediction.ts` の `SubmitPredictionResult` を `CreatePredictionResult` / `UpdatePredictionResult` にリネームする

## 3. Repository 層の更新

- [x] 3.1 `repositories/IRepository/IPredictionRepository.ts` に `create(topicId, predict)` / `update(predictionId, predict)` を追加し、`submit` を削除する
- [x] 3.2 `repositories/PredictionRepository.ts` に `create` / `update` を実装し、`submit` を削除する

## 4. Usecase 層の更新

- [x] 4.1 `usecases/IUsecase/IPredictionUsecase.ts` に `create` / `update` メソッドを追加し、`execute` を削除する
- [x] 4.2 `usecases/PredictionUsecase.ts` に `create` / `update` を実装し、`execute` を削除する

## 5. Server Action の更新

- [x] 5.1 `app/topic/[id]/predictions/actions.ts` の `submitPrediction` を `createPrediction(topicId, formData)` / `updatePrediction(predictionId, topicId, formData)` に分割する

## 6. Topic Detail ページの更新

- [x] 6.1 `app/topic/[id]/page.tsx` で全 predictions を取得し、各 prediction の Bet を `Promise.all` でまとめて取得する
- [x] 6.2 `app/topic/[id]/page.tsx` で `PredictionWithBet[]` を組み立て、`TopicDetail` に渡す props を更新する
- [x] 6.3 `app/topic/[id]/page.tsx` で各 prediction ごとに `saveBet` / `updatePrediction` を bind した action を生成して渡す

## 7. PredictionBetCard コンポーネントの新規作成

- [x] 7.1 `components/organisms/PredictionBetCard.tsx` を `"use client"` コンポーネントとして作成する
- [x] 7.2 `useState` で表示モード / Bet編集モード / 予想編集モードを管理する
- [x] 7.3 表示モードで予想値・Bet金額を表示し、各編集ボタンでモード切り替えできるようにする
- [x] 7.4 Bet未設定時は「Betを設定」ボタンを表示し、クリックで編集モードに遷移させる
- [x] 7.5 編集モードでは入力フィールドと保存・キャンセルボタンを表示し、保存後に表示モードに戻す

## 8. TopicDetail コンポーネントの更新

- [x] 8.1 `components/organisms/TopicDetail.tsx` の props を `prediction: PredictionWithValue | null` → `predictions: PredictionWithBet[]` に変更する
- [x] 8.2 予想セクションで `predictions` を map して `PredictionBetCard` を描画するよう変更する
- [x] 8.3 `BetForm` の直接利用を削除し、Betロジックを `PredictionBetCard` に委譲する

## 9. 既存テストの更新

- [x] 9.1 `PredictionUsecase` のテストを `create` / `update` メソッドに対応させ、`execute` のテストを削除する
- [x] 9.2 `PredictionRepository` のテストを `create` / `update` メソッドに対応させ、`submit` のテストを削除する
- [x] 9.3 `TopicDetail` のテストを新 props（`predictions: PredictionWithBet[]`）に対応させる
