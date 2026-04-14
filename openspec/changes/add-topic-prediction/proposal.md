## Why

Topicに対してユーザーが「予想」を投稿できる機能がない。Topic のステータス（open/closed）と連動した予想の管理基盤を整備することで、参加型コンテンツとしての価値を高める。

## What Changes

- `Prediction` テーブルを新設し、Topic と 1:N の関係を持つ予想エンティティを管理する
- `Prediction_number` テーブルを新設し、数値予想の値を保持する
- `prediction_type` により予想の種類（数値など）を判別できる設計とする
- Topic に対して予想を作成・一覧取得するServer Action を追加する

## Capabilities

### New Capabilities
- `topic-prediction`: Topicに対して予想を投稿・一覧取得する機能（Prediction / Prediction_number エンティティ、Prismaスキーマ、ユースケース、Server Action を含む）

### Modified Capabilities
- `prisma-schema`: Prediction・Prediction_number テーブルの追加に伴いスキーマ定義が変わる

## Impact

- `prisma/schema.prisma`: Prediction・Prediction_number モデル追加
- `src/domain/`: Prediction エンティティクラス追加
- `src/repositories/`: PredictionRepository 追加
- `src/usecases/`: PredictionUsecase 追加
- `src/app/`: 予想作成・一覧取得 Server Action 追加
- `src/lib/container.ts`: DI 配線追加
