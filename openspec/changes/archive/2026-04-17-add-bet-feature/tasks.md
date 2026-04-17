## 1. Prisma スキーマ変更

- [x] 1.1 `prisma/schema.prisma` に `Bet` モデルを追加（id, fk_prediction_id unique, value Float）
- [x] 1.2 `Prediction` モデルに `fk_bet_id Int?` と Bet へのリレーション追加
- [x] 1.3 `bunx prisma db push` でスキーマを DB に反映
- [x] 1.4 `bunx prisma generate` で Prisma Client を再生成

## 2. ドメイン層

- [x] 2.1 `src/domain/Bet.ts` を作成（id, predictionId, value フィールド、`from` static メソッド）

## 3. リポジトリ層

- [x] 3.1 `src/repositories/IRepository/IBetRepository.ts` を作成（`save`, `findByPredictionId` インターフェース）
- [x] 3.2 `src/repositories/BetRepository.ts` を作成（Prisma upsert で save 実装、findByPredictionId 実装）

## 4. ユースケース層

- [x] 4.1 `src/usecases/IUsecase/IBetUsecase.ts` を作成（`save`, `findByPredictionId` インターフェース）
- [x] 4.2 `src/usecases/BetUsecase.ts` を作成（バリデーション・ドメイン変換・Repository 呼び出し）

## 5. 型定義・DI 配線

- [x] 5.1 `src/types/bet.ts` を作成（`BetInput`, `SaveBetResult` 型）
- [x] 5.2 `src/lib/container.ts` に `betUsecase` を追加（BetRepository・BetUsecase の配線）

## 6. Server Action

- [x] 6.1 予想ページの `src/app/topic/[id]/actions.ts`（または新規ファイル）に `saveBet` Server Action を追加

## 7. UI

- [x] 7.1 予想ページ（`src/app/topic/[id]/page.tsx`）に Bet フォームコンポーネントを追加
- [x] 7.2 Bet フォームは予想フォームとは独立した `<form>` として実装
- [x] 7.3 既存 Bet がある場合は value を初期値として表示
