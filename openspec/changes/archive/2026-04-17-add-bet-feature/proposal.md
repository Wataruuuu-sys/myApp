## Why

予想（Prediction）に対してBet額を設定・管理する手段がなく、ユーザーが予想にどれだけ賭けるかを記録できない。Betは予想とは独立して編集可能であるべきため、Predictionとは分離したエンティティとして管理する。

## What Changes

- `Bet` モデルを新規追加（fk_prediction_id, value）
- `Prediction` に `fk_bet_id`（nullable）を追加し、Betへの参照を持たせる
- 予想ページからBetの作成・編集UIを追加
- Bet の作成・更新 Server Actions を実装
- domain/Bet, BetRepository, BetUsecase を新規追加

## Capabilities

### New Capabilities
- `bet-management`: 予想ページからBetを作成・編集する機能。Bet.value は数値必須。予想とは独立して編集可能。

### Modified Capabilities
- `prisma-schema`: Bet モデルの追加、Prediction への fk_bet_id 追加によるスキーマ変更。
- `topic-prediction`: 予想ページのUIにBet操作（作成・編集）を追加。

## Impact

- `prisma/schema.prisma`: Bet モデル追加、Prediction に fk_bet_id（Int?）追加
- `src/domain/Bet.ts`: Betドメインクラス新規追加
- `src/repositories/BetRepository.ts`, `src/repositories/IRepository/IBetRepository.ts`: 新規追加
- `src/usecases/BetUsecase.ts`, `src/usecases/IUsecase/IBetUsecase.ts`: 新規追加
- `src/lib/container.ts`: BetUsecase のDI配線追加
- `src/types/`: Bet操作用 Request/Result 型追加
- `src/app/` 配下のpredictionページ: BetのUI・Server Actions追加
